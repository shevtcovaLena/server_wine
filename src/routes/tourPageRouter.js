const Router = require("express").Router();

const { Tour } = require("../../db/models");

Router.get("/", async (req, res) => {
  try {
    const data = await Tour.findOne({ where: { id: req.query.tour_id } });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(204).json({ message: "Нет такого тура" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = Router;
