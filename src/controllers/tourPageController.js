const tourPageService = require("../services/tourPageService");

exports.getTourPage = async (req, res) => {
  try {
    const data = await tourPageService.getTourPage();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(204).json({ message: "Нет такого тура" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
