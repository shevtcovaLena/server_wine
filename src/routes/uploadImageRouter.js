const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename(req, file, cb) {
    cb(null, `TourMain${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post("/main", upload.single("main"), async (req, res) => {
  try {
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
    const { fileName } = req.body;
    const directoryPath = path.join(__dirname, "../../public/images");
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
