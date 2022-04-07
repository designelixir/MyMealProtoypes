const Sequelize = require("sequelize");
const db = require("../db");

const Menu = db.define("menu", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dedicatedFrom: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  orderNow: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Menu;
