const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Tour }) {
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(Tour, { foreignKey: "tour_id" });
    }
  }
  Comment.init(
    {
      user_id: DataTypes.INTEGER,
      tour_id: DataTypes.INTEGER,
      comment_text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    },
  );
  return Comment;
};
