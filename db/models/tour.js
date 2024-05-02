const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    static associate({
      User, Comment, Rating, Tour_date, Message,
    }) {
      this.belongsTo(User, { foreignKey: "owner_id" });
      this.hasMany(Message, { foreignKey: "tour_id" });
      this.hasMany(Comment, { foreignKey: "tour_id" });
      this.hasMany(Rating, { foreignKey: "tour_id" });
      this.hasMany(Tour_date, { foreignKey: "tour_id" });
    }
  }
  Tour.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    owner_id: DataTypes.INTEGER,
    region: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    location_x: DataTypes.STRING,
    location_y: DataTypes.STRING,
    status: DataTypes.STRING,
    length_days: DataTypes.INTEGER,
    path_img: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "Tour",
  });
  return Tour;
};
