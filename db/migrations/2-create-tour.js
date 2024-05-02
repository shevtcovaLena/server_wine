/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      owner_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "Users" },
          key: "id",
        },
      },
      region: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DECIMAL(15, 2),
      },
      location_x: {
        type: Sequelize.STRING,
      },
      location_y: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      length_days: {
        type: Sequelize.INTEGER,
      },
      path_img: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tours");
  },
};
