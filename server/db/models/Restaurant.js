const Sequelize = require("sequelize");
const db = require("../db");

const Restaurant = db.define("restaurant", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  crossContactProcedure: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  primaryColor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Restaurant;
