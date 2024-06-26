const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const path = require("path");
const apiRouter = require("./routes/apiRouter");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const sessionConfig = {
  name: "cookieName",
  store: new FileStore(),
  secret: process.env.SECRET_KEY_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 1000 * 60 * 60,
    httpOnly: true,
    sameSite: "None",
    secure: true,
  },
};
const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://wine-dev.vercel.app", "http://localhost:80", "http://192.168.88.209:80"],
  exposedHeaders: ["set-cookie"],
  credentials: true,
};

app.use(express.static(path.join(process.cwd(), "public")));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(session(sessionConfig));

app.use("/api", apiRouter);

const server = app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));

const io = new Server(server, { cors: corsOptions });

io.on("connection", (socket) => {
  socket.on("join", ({ userName, tourId }) => {
    console.log("Пользователь подключился", socket.rooms);
    socket.join(tourId);

    socket.emit("message", {
      data: {
        userName: "Админ",
        message: `Здравствуйте, ${userName}! Здесь вы можете связаться с организатором тура.`,
        time: new Date().toLocaleTimeString().slice(0, 5),
      },
    });
  });

  socket.on("sendMessage", ({ data }) => {
    console.log("Получено сообщение:", data.message);
    io.to(data.room).emit("message", { data });
  });

  socket.on("disconnect", () => {
    console.log("Пользователь отключился");
  });
});
