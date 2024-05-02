const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ! Фото для основы тура
const storage = multer.diskStorage({
  // Настройка директории для сохранения файлов
  destination(req, file, cb) {
    cb(null, "../client/public/images");
  },
  // Настройка имени файла
  filename(req, file, cb) {
    cb(null, `TourMain${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post("/main", upload.single("main"), async (req, res) => {
  try {
    // console.log(req.file);
    res
      .status(200)
      .json({ msg: "Файл загружен", newFileNmae: req.file.filename });
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

router.post("/del_main", async (req, res) => {
  try {
    // console.log(req.file);

    const { fileName } = req.body;
    const directoryPath = path.join(__dirname, "../../client/public/images");
    const filePath = path.join(directoryPath, fileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ msg: "Не удалось удалить файл" });
      }
      res.send({ msg: "Файл успешно удален" });
    });
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});
// !

module.exports = router;
