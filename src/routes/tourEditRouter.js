/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
const Router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { Tour, Tour_date } = require("../../db/models");

async function newDataTour(
  valueNumberDay,
  inputs,
  tbDate,
  coordinates,
  MainFileImg,
  user,
) {
  try {
    const newTour = await Tour.create({
      title: inputs.title,
      description: inputs.description,
      owner_id: user.id,
      region: inputs.region,
      price: inputs.price,
      location_x: coordinates[1],
      location_y: coordinates[0],
      status: "new", 
      length_days: valueNumberDay,
      path_img: MainFileImg,
    });

    const tourDatesData = [];
    for (const iterator of tbDate.arrDate) {
      tourDatesData.push({
        tour_id: newTour.id,
        date: iterator.dateStart,
        date_end: iterator.dateEnd,
        quantity_seats: iterator.quantity_seats,
      });
    }

    const newTourDates = await Tour_date.bulkCreate(tourDatesData);
    return true;
  } catch (error) {
    console.log("ОШИБКА newDataTour", error);
    return false;
  }
}

async function newSeedTxt(
  valueNumberDay,
  inputs,
  tbDate,
  coordinates,
  MainFileImg,
  user,
  tour_id,
) {
  
  const tourData = {
    title: inputs.title,
    description: inputs.description,
    owner_id: user.id,
    region: inputs.region,
    price: inputs.price,
    location_x: coordinates[1],
    location_y: coordinates[0],
    status: "allowed",
    length_days: valueNumberDay,
    path_img: MainFileImg,
  };

  const tourDatesData = tbDate.arrDate.map((iterator) => ({
    tour_id,
    date: iterator.dateStart,
    date_end: iterator.dateEnd,
    quantity_seats: iterator.quantity_seats,
  }));

  const fileContent = JSON.stringify({ tourData, tourDatesData }, null, 2);

  const filePath = path.join(__dirname, `tour-${tour_id}.txt`);

  try {
    await fs.promises.writeFile(filePath, fileContent);
    console.log("Файл успешно записан!");
  } catch (error) {
    console.error("Ошибка при записи файла:", error);
  }
}

async function updDataTour(
  tour_id,
  valueNumberDay,
  inputs,
  tbDate,
  coordinates,
  MainFileImg,
  // user,
) {
  try {
    await Tour.update(
      {
        title: inputs.title,
        description: inputs.description,
        region: inputs.region,
        price: inputs.price,
        location_x: coordinates[1],
        location_y: coordinates[0],
        length_days: valueNumberDay,
        path_img: MainFileImg,
      },
      {
        where: { id: tour_id },
      },
    );

    const tourDatesData = [];
    for (const iterator of tbDate.arrDate) {
      if (iterator.date_id === -1) {
        tourDatesData.push({
          tour_id,
          date: iterator.dateStart,
          date_end: iterator.dateEnd,
          quantity_seats: iterator.quantity_seats,
        });
      }
    }

    if (tourDatesData.length) {
      await Tour_date.bulkCreate(tourDatesData);
    }

    return true;
  } catch (error) {
    console.log("Ошибка в updDataTour", error);
    return false;
  }
}

Router.post("/", async (req, res) => {
  try {
    const { tour_id } = req.query;

    const { user } = req.session;
    const {
      valueNumberDay, inputs, tbDate, coordinates, MainFileImg,
    } = req.body;

    console.log("tour_id =============== ", tour_id);
    let resultTour = false;

    if (tour_id === "-1") {
      resultTour = await newDataTour(
        valueNumberDay,
        inputs,
        tbDate,
        coordinates,
        MainFileImg,
        user,
      );
    } else {
      resultTour = await updDataTour(
        tour_id,
        valueNumberDay,
        inputs,
        tbDate,
        coordinates,
        MainFileImg,
        user,
      );
    }

    if (resultTour) {
      res.status(200).json({ msg: "записан!" });
    } else {
      res.status(500).json({ msg: "что то пошло не так" });
    }
  } catch (error) {
    console.log("ОШИБКА post", error);
  }
});

Router.patch("/cancel/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Tour.update({ status: "canceled" }, { where: { id } });
  } catch (error) {
    console.log("ОШИБКА patch", error);
  }
});

Router.patch("/allow/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Tour.update({ status: "allowed" }, { where: { id } });
  } catch (error) {
    console.log("ОШИБКА patch", error);
  }
});

Router.get("/tour_data", async (req, res) => {
  try {
    const data = await Tour.findOne({
      where: { id: req.query.tour_id },
      include: [Tour_date],
    });
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
