/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      travelerName: {
        type: Sequelize.INTEGER,
      },
      owner_id: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "Users" },
          key: "id",
        },
      },
      tour_id: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "Tours" },
          key: "id",
        },
      },
      text: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Messages");
  },
};
