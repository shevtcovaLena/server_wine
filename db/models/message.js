const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ User, Tour }) {
      this.belongsTo(User, { foreignKey: "owner_id" });
      this.belongsTo(Tour, { foreignKey: "tour_id" });
    }
  }
  Message.init({
    travelerName: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    tour_id: DataTypes.INTEGER,
    text: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: "Message",
  });
  return Message;
};
