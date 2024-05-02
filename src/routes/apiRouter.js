const router = require("express").Router();
const userRouter = require("./userRouter");
const toursRouter = require("./toursRouter");
const tourPageRouter = require("./tourPageRouter");
const dateRouter = require("./dateRouter");
const reservationRouter = require("./reservationRouter");
const travelerRouter = require("./travelerRouter");
const tourEditRouter = require("./tourEditRouter");
const uploadImageRouter = require("./uploadImageRouter");
const organizerRouter = require("./organizerRouter");
const ratingRouter = require("./ratingRouter");

router.use("/user", userRouter);
router.use("/tours", toursRouter);
router.use("/tour", tourPageRouter);
router.use("/date", dateRouter);
router.use("/reserv", reservationRouter);
router.use("/traveler", travelerRouter);
router.use("/tour_edit", tourEditRouter);
router.use("/upload_image", uploadImageRouter);
router.use("/organizer", organizerRouter);
router.use("/ratings", ratingRouter);

module.exports = router;
