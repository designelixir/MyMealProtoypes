const Sequelize = require("sequelize");
const db = require("../db");
const { dollar } = require("./utils/getters");

const PriceType = db.define("pricetype", {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
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

module.exports = PriceType;
