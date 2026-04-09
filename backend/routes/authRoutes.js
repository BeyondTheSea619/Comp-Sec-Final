const express = require("express");
const router = express.Router();
const {
  loginValidation,
  handleValidationErrors,
} = require("../middleware/formvalidation");

router.post("/login", loginValidation, handleValidationErrors, (req, res) => {
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

module.exports = router;
