// Verifies JWT on protected routes (A01, A07)

const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "demo-secret";

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Login required." });
  }

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Invalid or expired token." });
  }
}

function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    req.log?.("auth_fail", { userId: req.user?.id, path: req.path });
    return res.status(403).json({ error: "Admins only." });
  }
  next();
}

module.exports = { authenticate, adminOnly };
