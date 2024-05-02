const { Tour } = require("../db/models/tour");

exports.getTourPage = async () => {
  try {
    const data = await Tour.findOne({ raw: true });
    return data;
  } catch (err) {
    throw new Error("Ошибка сервера");
  }
};
