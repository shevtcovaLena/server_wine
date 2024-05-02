const router = require("express").Router();
const { Reservation_tour } = require("../../db/models");

// получаем число броней на конкретную дату
router.get("/date/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allReservsByDate = await Reservation_tour.findAll({
      where: { tour_date_id: id },
    });
    res.json(allReservsByDate.length);
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

router.post("/", async (req, res) => {
  const {
    id, date, date_end, number,
  } = req.body;
  try {
    const data = [];
    for (let i = 0; i < number; i++) {
      data.push(
        {
          user_id: req.session.user.id,
          tour_date_id: id,
          date,
          date_end,
        },
      );
    }
    await Reservation_tour.bulkCreate(data);
    res.sendStatus(200);
  } catch (error) {
    console.log("ОШИБКА", error);
  }
});

module.exports = router;
