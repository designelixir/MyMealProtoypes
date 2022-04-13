const Sequelize = require("sequelize");
const db = require("../db");
const { dollar } = require("./utils/getters");
const MenuItem = db.define("menuitem", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.TEXT,
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
    allowNull: false,
  },
  priceFormatted: {
    type: Sequelize.VIRTUAL,
    get() {
      return dollar.call(this, "price");
    },
  },
});

module.exports = MenuItem;
