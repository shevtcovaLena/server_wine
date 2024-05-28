/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
const router = require("express").Router();
const {
  User,
  Tour,
  Comment,
  Rating,
  Tour_date,
  Reservation_tour,
} = require("../../db/models");

router.get("/active", async (req, res) => {
  try {
    const { user } = req.session;
    const tours = await Tour.findAll({
      where: { owner_id: user.id },
      include: [Comment, Rating, Tour_date],
    });

    const mapReservations = async (tour) => {
      const reserev = await Reservation_tour.findAll({
        where: {
          tour_date_id: tour.dataValues.id,
        },
        include: [
          {
            model: User,
            attributes: ["full_name", "telephone"],
          },
        ],
      });

      const arrReturn = [];

      for (const iterator of reserev) {
        const obj = {
          id: iterator.dataValues.id,
          name: iterator.User.dataValues.full_name,
          tel: iterator.User.dataValues.telephone,
        };
        arrReturn.push(obj);
      }

      return arrReturn;
    };

    function addDaysToDate(dateStr) {
      const date = new Date(dateStr);
      date.setDate(date.getDate());
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    const newData = [];
    for (const iterator of tours) {
      if (iterator.Tour_dates.length) {
        for (const td of iterator.Tour_dates) {
          const arrReserv = await mapReservations(td);

          if (arrReserv.length === 0) {
            continue;
          }

          newData.push({
            id: iterator.dataValues.id,
            title: `${iterator.dataValues.title} [${addDaysToDate(
              td.date,
            )} ${addDaysToDate(td.date_end)}]  Мест ${arrReserv.length}/${
              td.quantity_seats
            }`,
            link: `/tour/${iterator.dataValues.id}#disqus_thread`,
            arrReserv,
          });
        }
      }
    }

    res.status(200).json(newData);
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

router.get("/tours", async (req, res) => {
  try {
    const { user } = req.session;
    const tours = await Tour.findAll({
      where: {
        owner_id: user.id,
      },
    });

    const ToursOwner = tours.map((tour) => tour.get({ plain: true }));

    res.status(200).json(ToursOwner);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
});

module.exports = router;
