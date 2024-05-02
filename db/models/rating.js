const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate({ User, Tour }) {
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(Tour, { foreignKey: "tour_id" });
    }
  }
  Rating.init({
    user_id: DataTypes.INTEGER,
    tour_id: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "Rating",
  });
  return Rating;
};
