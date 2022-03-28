const Sequelize = require("sequelize");
const db = require("../db");
const { address } = require("./utils/getters");
const Location = db.define("location", {
  streetOne: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  streetTwo: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  zip: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  address: {
    type: Sequelize.VIRTUAL,
    get() {
      return address.call(this);
    },
  },
});

module.exports = Location;
