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
      return res.status(400).json({ error: "Thiếu file upload" });
    }

    const filePath = req.file.path;
    const originalName = iconv.decode(
      Buffer.from(req.file.originalname, "binary"),
      "utf-8"
    );

    const videoId = await uploadVideoToCloudflare(filePath, originalName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Lỗi khi xóa file:", err);
      } else {
        console.log(`Đã xóa file: ${filePath}`);
      }
    });

    res.json({ message: "Upload thành công!", videoId, originalName });
  } catch (error) {
    console.error("Lỗi khi upload:", error.response?.data || error.message);
    res.status(500).json({ error: "Upload thất bại" });
  }
});

router.get("/videos", async (req, res) => {
  try {
    const response = await axios.get(CLOUDFLARE_STREAM_URL, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
