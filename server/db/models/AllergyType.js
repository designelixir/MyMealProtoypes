const Sequelize = require("sequelize");
const db = require("../db");

const AllergyType = db.define("allergytype", {
  type: {
    type: Sequelize.ENUM("Safe", "Modifiable", "Unsafe", "Cross Contaminated"),
    allowNull: false,
    defaultValue: "Safe",
  },
  cross: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  modDescription: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  crossDescription: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = AllergyType;
