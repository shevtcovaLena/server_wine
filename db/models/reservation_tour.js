const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reservation_tour extends Model {
    static associate({ User, Tour_date }) {
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(Tour_date, { foreignKey: "tour_date_id" });
    }
  }
  Reservation_tour.init(
    {
      user_id: DataTypes.INTEGER,
      tour_date_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
      date_end: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Reservation_tour",
    },
  );
  return Reservation_tour;
};
