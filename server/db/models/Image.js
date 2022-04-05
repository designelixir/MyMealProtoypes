const Sequelize = require("sequelize");
const db = require("../db");

const Image = db.define("image", {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Image;
