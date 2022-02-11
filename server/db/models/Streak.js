const Sequelize = require("sequelize");
const db = require("../db");

const Streak = db.define("streak", {
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Streak;
