const Sequelize = require("sequelize");
const db = require("../db");

const Menu = db.define("menu", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Menu;
