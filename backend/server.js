const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// middleware
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// making upload folder
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// configure file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Save file with timestamp to avoid duplicate names
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Restrict file type and file size
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, and PNG files are allowed"));
    }
  },
});

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  if (email === "admin@test.com" && password === "1234") {
    return res.json({
      message: "Login successful",
      token: "demo-token",
      role: "admin",
    });
  }

  if (email === "user@test.com" && password === "1234") {
    return res.json({
      message: "Login successful",
      token: "demo-token-user",
      role: "user",
    });
  }

  return res.status(401).json({
    message: "Invalid email or password",
  });
});

// search route
app.get("/api/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";

  const items = [
    { id: 1, name: "Restaurant A" },
    { id: 2, name: "Restaurant B" },
    { id: 3, name: "Cafe C" },
  ];

  const results = items.filter((item) => item.name.toLowerCase().includes(q));

  res.json(results);
});

// upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
