const express = require("express");
const cors = require("cors");
const videoRoutes = require("./src/api/videoRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Trang chủ
app.get("/", (req, res) => {
  res.send(`
      <html>
      <head>
          <title>Chào mừng</title>
          <style>
              body { font-family: Arial, sans-serif; text-align: center; margin: 50px; }
              h1 { color: #2d89ef; }
              p { font-size: 18px; }
          </style>
      </head>
      <body>
          <h1>Chào mừng đến với Cloudflare Stream Server</h1>
          <p>API Node.js để quản lý video với Cloudflare Stream.</p>
      </body>
      </html>
  `);
});

// Sử dụng routes từ videoRoutes
app.use("/api", videoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
