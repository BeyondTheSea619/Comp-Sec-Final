const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// GET /api/search?q=burger
router.get("/search", async (req, res) => {
  const q = req.query.q?.trim() || "";

  try {
    // Case-insensitive search on name or cuisine
    const results = await Restaurant.find({
      isActive: true,
      $or: [
        { name: { $regex: q, $options: "i" } },
        { cuisine: { $regex: q, $options: "i" } },
      ],
    }).select("_id name cuisine address");

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
