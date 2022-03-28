const Sequelize = require("sequelize");
const db = require("../db");

const Corporation = db.define("corporation", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Corporation;
