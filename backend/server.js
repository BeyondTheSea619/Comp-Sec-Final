const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Import route files
const authRoutes = require("./routes/authRoutes");
const searchRoutes = require("./routes/searchRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const PORT = 5000;
// const JWT_SECRET = "compsec-demo-secret";

// middleware
app.use(cors());
app.use(express.json());

// ensure upload folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// health check route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Register modular routes
app.use("/api", authRoutes);
app.use("/api", searchRoutes);
app.use("/api", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
