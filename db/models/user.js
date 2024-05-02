const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      Comment, Tour, Rating, Reservation_tour, Message,
    }) {
      this.hasMany(Message, { foreignKey: "owner_id" });
      this.hasMany(Comment, { foreignKey: "user_id" });
      this.hasMany(Tour, { foreignKey: "owner_id" });
      this.hasMany(Rating, { foreignKey: "user_id" });
      this.hasMany(Reservation_tour, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      full_name: DataTypes.STRING,
      role: DataTypes.STRING,
      avatar: DataTypes.STRING,
      telephone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
