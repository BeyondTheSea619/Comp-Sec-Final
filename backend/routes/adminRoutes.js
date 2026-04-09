const express = require("express");
const router = express.Router();
const { authenticate, adminOnly } = require("../middleware/authenticate");

// TEMP DATA
let users = [
  { id: 1, email: "admin@test.com", role: "admin" },
  { id: 2, email: "user@test.come", role: "user" },
];

let logs = [];

// View users
router.get("/users", authenticate, adminOnly, (req, res) => {
  res.json(users);
});

// Delete user
router.delete("/users/:id", authenticate, adminOnly, (req, res) => {
  const id = parseInt(req.params.id);

  users = users.fillter((u) => u.id !== id);

  req.log("admin_delete_user", {
    adminId: req.user.id,
    targetId: id,
  });

  res.json({ message: "User deleted" });
});

// View logs
router.get("/logs", authenticate, adminOnly, (req, res) => {
  res.json(logs);
});

module.exports = router;
