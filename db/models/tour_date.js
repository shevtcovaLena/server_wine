const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tour_date extends Model {
    static associate({ Reservation_tour, Tour }) {
      this.hasMany(Reservation_tour, { foreignKey: "tour_date_id" });
      this.belongsTo(Tour, { foreignKey: "tour_id" });
    }
  }
  Tour_date.init(
    {
      tour_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
      date_end: DataTypes.DATE,
      quantity_seats: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tour_date",
    },
  );
  return Tour_date;
};
