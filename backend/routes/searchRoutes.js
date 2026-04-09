const express = require("express");
const router = express.Router();

router.get("/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";

  const items = [
    { id: 1, name: "BurgerKing" },
    { id: 2, name: "Domino's Pizza" },
    { id: 3, name: "A&W" },
  ];

  const results = items.filter((item) => item.name.toLowerCase().includes(q));

  res.json(results);
});

module.exports = router;
