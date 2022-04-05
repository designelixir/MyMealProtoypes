const Sequelize = require("sequelize");
const db = require("../db");

const Corporation = db.define("corporation", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  crossContactProcedure: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Corporation;
