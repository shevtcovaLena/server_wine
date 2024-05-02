const router = require("express").Router();
const {
  Reservation_tour, Tour, Tour_date, User,
} = require("../../db/models");

router.get("/", async (req, res) => {
  const { user } = req.session;
  console.log("в ручке туров пользователя");
  try {
    const allTravelerTours = await Reservation_tour.findAll({
      attributes: ["id", "user_id", "tour_date_id", "date", "date_end"],
      include: [
        {
          model: User,
          where: { id: user.id }, // Фильтрация по ID пользователя
          attributes: ["full_name"], // Здесь можно указать, какие атрибуты пользователя нужно получить
        },
        {
          model: Tour_date,
          include: [
            {
              model: Tour,
              attributes: ["id", "title", "description", "path_img"],
            },
          ],
          attributes: ["tour_id", "date", "date_end", "quantity_seats"],
        },
      ],
    });

    const trueTravelerTours = allTravelerTours.map((tour) => tour.get({ plain: true }));

    const travelInfo = trueTravelerTours.map((info) => {
      info.userName = info.User.full_name;
      delete info.User;

      info.tourId = info.Tour_date.Tour.id;
      info.tourTitle = info.Tour_date.Tour.title;
      info.tourImg = info.Tour_date.Tour.path_img;

      info.tourDateId = info.tour_date_id;
      info.tourDateStart = info.date;
      info.tourDateEnd = info.date_end;
      delete info.tour_date_id;
      delete info.date;
      delete info.date_end;
      delete info.Tour_date;
      return info;
    });

    res.json(travelInfo);
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Reservation_tour.destroy({
      where: { id },
    });
    res.sendStatus(200);
  } catch (error) {
    res.json({ err: error });
  }
});
module.exports = router;
