const express = require("express");
const router = express.Router();
const { authenticate, adminOnly } = require("../middleware/authenticate");
const User = require("../models/User");
const SecurityLog = require("../models/SecurityLog");

// GET /api/users — view all users (admin only)
router.get("/users", authenticate, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/users/:id — delete a user (admin only)
router.delete("/users/:id", authenticate, adminOnly, async (req, res) => {
  try {
    const target = await User.findByIdAndDelete(req.params.id);
    if (!target) {
      return res.status(404).json({ message: "User not found" });
    }

    await SecurityLog.create({
      event: "admin_delete_user",
      userId: req.user.id,
      ip: req.ip,
      details: { deletedUserId: req.params.id, deletedEmail: target.email },
    });

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/logs — view security logs (admin only)
router.get("/logs", authenticate, adminOnly, async (req, res) => {
  try {
    const logs = await SecurityLog.find({}).sort({ createdAt: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    console.error("Get logs error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
