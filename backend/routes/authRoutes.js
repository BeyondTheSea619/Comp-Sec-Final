const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  loginValidation,
  handleValidationErrors,
  registerValidation,
} = require("../middleware/formvalidation");

const User = require("../models/User");
const SecurityLog = require("../models/SecurityLog");

const SECRET = process.env.JWT_SECRET || "demo-secret";
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// POST /api/login
router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body;
    const ip = req.ip;

    try {
      const user = await User.findOne({ email });

      // User not found
      if (!user) {
        await SecurityLog.create({
          event: "login_failed",
          email,
          ip,
          details: { reason: "user not found" },
        });
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Account locked
      if (user.isLocked) {
        await SecurityLog.create({
          event: "login_blocked",
          email,
          ip,
          details: { reason: "account locked" },
        });
        return res
          .status(403)
          .json({ message: "Account locked. Try again in 15 minutes." });
      }

      // Wrong password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
          user.lockUntil = new Date(Date.now() + LOCK_DURATION_MS);
          await SecurityLog.create({ event: "account_locked", email, ip });
        } else {
          await SecurityLog.create({
            event: "login_failed",
            email,
            ip,
            details: { attempts: user.loginAttempts },
          });
        }
        await user.save();
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Success — reset login attempts
      user.loginAttempts = 0;
      user.lockUntil = null;
      await user.save();

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        SECRET,
        { expiresIn: "1h" },
      );

      await SecurityLog.create({
        event: "login_success",
        userId: user._id,
        email,
        ip,
      });

      return res.json({ message: "Login successful", token, role: user.role });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  },
);

// POST /api/register
router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body;
    const ip = req.ip;

    try {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ message: "Email already in use" });
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashed, role: "user" });

      await SecurityLog.create({
        event: "register",
        userId: user._id,
        email,
        ip,
      });

      return res.status(201).json({ message: "Registration successful" });
    } catch (err) {
      console.error("Register error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  },
);

module.exports = router;
