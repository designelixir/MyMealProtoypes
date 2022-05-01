const Sequelize = require("sequelize");
const db = require("../db");
const { dollar } = require("./utils/getters");
const MenuItem = db.define("menuitem", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  ingredients: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  nutritionFacts: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM("Single", "Variation"),
    allowNull: false,
    defaultValue: "Single",
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  priceFormatted: {
    type: Sequelize.VIRTUAL,
    get() {
      return dollar.call(this, "price");
    },
  },
  archived: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = MenuItem;
