const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { User } = require("../../db/models");
const mailer = require("./nodemailer");

router.get("/", (req, res) => {
  res.json(req.session?.user || "");
});

router.get("/full", async (req, res) => {
  try {
    const { id } = req.session?.user;
    const user = await User.findOne({ where: { id } });
    res.json(user || "");
  } catch (error) {
    console.log(error);
    res.json({ err: "Ошибка БД!" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.json({ err: "Такой пользователь не найден!" });
    } else {
      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        res.json({ err: "Неверный пароль!" });
      } else {
        req.session.user = {
          full_name: user.full_name,
          id: user.id,
          role: user.role,
          avatar: user.avatar,
        };
        console.log(req.session.user.full_name)
        req.session.save(() => {
          res.status(200).json(req.session.user);
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ err: "Ошибка при авторизации!" });
  }
});

router.post("/reg", async (req, res) => {
  const {
    full_name, email, telephone, password, role,
  } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
    });

    if (user !== null) {
      res.json({
        err: "Пользователь c таким email уже существует!",
      });
    } else {
      const hashPass = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        full_name,
        email,
        telephone,
        password: hashPass,
        role,
      });
      const message = {
        to: req.body.email,
        subject: "Поздравляем с успешной регистрацией!",
        text: `Поздравляем с успешной регистрацией!
        данные вашей учетной записи:
        Имя:${req.body.full_name}
        Телефон:${req.body.telephone}

        Желаем найти тот самый идеальный тур!

        С уважением, команда проекта Wine Tour
        
        Данное письмо не требует ответа.
        `,
      };
      mailer(message);
      req.session.user = { full_name, id: newUser.id, role };
      req.session.save(() => {
        res.status(200).json(req.session.user);
      });
    }
  } catch (error) {
    console.log("ОШИБКА", error);
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("cookieName");
    res.sendStatus(200);
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

router.patch("/", async (req, res) => {
  const { full_name, telephone, avatar } = req.body;
  const { id } = req.session.user;
  try {
    if (avatar) {
      await User.update(
        { avatar },
        { where: { id } },
      );
    }
    await User.update(
      { full_name, telephone },
      { where: { id } },
    );
    const updateUser = await User.findOne({ where: { id } });
    res.status(200).json(updateUser);
  } catch (error) {
    console.log("ОШИБКА", error);
    res.status(500).json({ err: error });
  }
});

module.exports = router;
