const Sequelize = require("sequelize");
const db = require("../db");

const Category = db.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  archived: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Category;
