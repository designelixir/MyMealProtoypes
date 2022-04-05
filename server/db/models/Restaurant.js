const Sequelize = require("sequelize");
const db = require("../db");

const Restaurant = db.define("restaurant", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  primaryColor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Restaurant;
