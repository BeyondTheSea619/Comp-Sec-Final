const express = require("express");
const cors = require("cors");

// middleware
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
