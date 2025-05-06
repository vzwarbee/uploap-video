// middleware/verifyRole.js
const admin = require("../configs/firebase.config").admin;

function verifyRole(requiredRole) {
  return async function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Có vẻ bạn chưa đăng nhập." });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;

      const userDoc = await admin
        .firestore()
        .collection("users")
        .doc(decodedToken.uid)
        .get();

      if (!userDoc.exists) {
        return res
          .status(404)
          .json({ error: "Không tìm thấy user trong Firestore." });
      }

      const userData = userDoc.data();

      if (Number(userData.role) !== Number(requiredRole)) {
        return res
          .status(403)
          .json({ error: "Truy cập bị từ chối, với vai trò của bạn." });
      }

      req.user.role = userData.role;

      next();
    } catch (err) {
      console.error("Vai trò bị lỗi:", err.message);
      return res
        .status(401)
        .json({ error: "Token không hợp lệ hoặc hết hạn." });
    }
  };
}

module.exports = verifyRole;
