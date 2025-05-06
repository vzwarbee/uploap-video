const express = require("express");
const router = express.Router();
const { admin, db } = require("../configs/firebase.config");
const { default: axios } = require("axios");
const verifyRole = require("../middleware/verifyToken");

const API_KEY = process.env.API_KEY;

router.post("/signup", verifyRole(0), async (req, res) => {
  const { email, password } = req.body;
  const randomNameId = `kara${Math.floor(100000 + Math.random() * 900000)}`;

  if (!password || !email) {
    return res
      .status(400)
      .json({ error: "Không được để trống trường dữ liệu!" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: randomNameId,
    });

    const uid = userRecord.uid;

    await db.collection("users").doc(uid).set({
      name: randomNameId,
      email,
      role: 1,
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      data: {
        uid: uid,
        displayName: randomNameId,
        email: email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email hoặc password là bắt buộc" });
  }

  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { idToken, localId, refreshToken, displayName } = response.data;

    res.status(200).json({
      status: 200,
      message: "Login successful",
      uid: localId,
      result: {
        uid: localId,
        name: displayName,
      },
      idToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    const error = err.response?.data?.error || {};
    res.status(401).json({
      error: "Login failed",
      message: error.message || "Unknown error",
      info: err,
    });
  }
});

router.get("/get-user", verifyRole(0), (req, res) => {
  res.json({
    message: "Welcome, Admin!",
    uid: req.user.uid,
    name: req.user.name,
    role: req.user.role,
    email: req.user.email,
  });
});

module.exports = router;
