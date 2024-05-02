const router = require("express").Router();
const { Tour, User } = require("../../db/models");

router.get("/", async (req, res) => {
  // console.log('Зашли в ручку');
  try {
    const allTours = await Tour.findAll();
    res.json(allTours);
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

router.get("/extended", async (req, res) => {
  try {
    const response = await Tour.findAll({
      include: {
        model: User,
        attributes: ["full_name", "email", "telephone"],
      },
    });
    const allTours = response.map((el) => el.get({ plain: true }));
    res.json(allTours);
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

module.exports = router;
