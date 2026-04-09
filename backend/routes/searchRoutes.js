const express = require("express");
const router = express.Router();

router.get("/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";

  const items = [
    { id: 1, name: "Restaurant A" },
    { id: 2, name: "Restaurant B" },
    { id: 3, name: "Cafe C" },
  ];

  const results = items.filter((item) => item.name.toLowerCase().includes(q));

  res.json(results);
});

module.exports = router;
