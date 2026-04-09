const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  loginValidation,
  handleValidationErrors,
} = require("../middleware/formvalidation");

const SECRET = process.env.JWT_SECRET || "demo-secret";

router.post("/login", loginValidation, handleValidationErrors, (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  if (email === "admin@test.com" && password === "1234") {
    const token = jwt.sign({ id: 1, email, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      message: "Login successful",
      token,
      role: "admin",
    });
  }

  if (email === "user@test.com" && password === "1234") {
    const token = jwt.sign({ id: 1, email, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      message: "Login successful",
      token,
      role: "user",
    });
  }

  return res.status(401).json({
    message: "Invalid email or password",
  });
});

module.exports = router;
