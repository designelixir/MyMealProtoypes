const Sequelize = require("sequelize");
const db = require("../db");

const Allergy = db.define("allergy", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Allergy;
