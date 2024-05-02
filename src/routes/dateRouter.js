const router = require("express").Router();
const { Tour_date, Reservation_tour } = require("../../db/models");

// Получаем все даты по всем турам
router.get("/", async (req, res) => {
  //   console.log('Зашли в ручку');
  try {
    const allDateByTour = await Tour_date.findAll({ raw: true });
    res.json(allDateByTour);
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

// Получаем все даты по id тура в params
router.get("/tour/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allDateByTour = await Tour_date.findAll({
      where: { tour_id: id },
      include: [Reservation_tour],
    });

    res.json(allDateByTour);
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

// Получаем дату по id
router.get("/:id", async (req, res) => {
  // console.log("Зашли в ручку");
  const { id } = req.params;
  try {
    const oneDate = await Tour_date.findOne({ where: { id } });
    res.json(oneDate);
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

module.exports = router;
