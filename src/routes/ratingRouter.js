const express = require("express");

const router = express.Router();
const { Rating, sequelize } = require("../../db/models");

router.get("/average", async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      attributes: ["tour_id", [sequelize.fn("avg", sequelize.col("rate")), "average"]],
      group: ["tour_id"],
    });

    res.json(ratings);
  } catch (error) {
    console.error("Error fetching average ratings:", error);
    res.status(500).json({ error: "Failed to fetch average ratings" });
  }
});

router.post("/", async (req, res) => {
  const { user_id, tour_id, rate } = req.body;

  try {
    const newRating = await Rating.create({
      user_id,
      tour_id,
      rate,
    });

    res.status(201).json(newRating);
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({ error: "Failed to create rating" });
  }
});

module.exports = router;
