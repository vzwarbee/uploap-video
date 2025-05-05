const express = require("express");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
const uploadMidd = require("../middleware/uploadMiddleware");
const { CLOUDFLARE_STREAM_URL, CLOUDFLARE_API_KEY } = require("../config");

const router = express.Router();

const uploadVideoToCloudflare = async (filePath, fileName) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath), fileName);
  // formData.append("file", fs.createReadStream(filePath), fileName);

  const response = await axios.post(CLOUDFLARE_STREAM_URL, formData, {
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
      ...formData.getHeaders(),
    },
    maxBodyLength: Infinity,
  });

  return response.data.result.uid;
};

router.post("/upload", uploadMidd.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Thiếu file video để upload" });
    }

    const allowedMimeTypes = [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
    ];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path);
      return res
        .status(400)
        .json({ error: "Chỉ chấp nhận file video (MP4, MOV, AVI)" });
    }

    // Giới hạn kích thước file (ví dụ 500MB)
    const maxSize = 500 * 1024 * 1024;
    if (req.file.size > maxSize) {
      fs.unlinkSync(req.file.path);
      return res
        .status(400)
        .json({ error: "File video quá lớn (tối đa 500MB)" });
    }

    const filePath = req.file.path;
    const originalName = iconv
      .decode(Buffer.from(req.file.originalname, "binary"), "utf-8")
      .replace(/[^\w\s.-]/gi, "");

    const videoId = await Promise.race([
      uploadVideoToCloudflare(filePath, originalName),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Upload timeout sau 30 phút")),
          1800000
        )
      ),
    ]);

    try {
      await fs.promises.unlink(filePath);
      console.log(`Đã xóa file tạm: ${filePath}`);
    } catch (unlinkError) {
      console.error("Lỗi khi xóa file tạm:", unlinkError);
    }

    res.json({
      success: true,
      message: "Upload video thành công",
      videoId,
      originalName: originalName,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Lỗi upload video:", error);

    if (req.file?.path) {
      try {
        await fs.promises.unlink(req.file.path);
      } catch (unlinkError) {
        console.error(
          "Lỗi khi xóa file tạm sau khi upload thất bại:",
          unlinkError
        );
      }
    }

    const statusCode = error.message.includes("timeout") ? 504 : 500;
    res.status(statusCode).json({
      success: false,
      error: error.message || "Upload video thất bại",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

router.get("/videos", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const response = await axios.get(CLOUDFLARE_STREAM_URL, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
      },
    });

    const allVideos = response.data?.result || [];

    const totalVideos = allVideos.length;
    const totalPages = Math.ceil(totalVideos / perPage);

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedVideos = allVideos.slice(startIndex, endIndex);

    res.json({
      data: paginatedVideos,
      pagination: {
        page,
        perPage,
        total: totalVideos,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({
      error: error.message || "Internal server error",
      details: error.response?.data || null,
    });
  }
});

router.delete("/delete-video", async (req, res) => {
  const videoId = req.query.id;

  if (!videoId) {
    return res.status(400).json({ error: "Thiếu video ID" });
  }

  try {
    const response = await axios.delete(`${CLOUDFLARE_STREAM_URL}/${videoId}`, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
      },
    });

    if (response.data.success) {
      res.json({ message: "Video đã được xoá thành công." });
    } else {
      res.status(500).json({ error: response.data.errors });
    }
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

module.exports = router;
