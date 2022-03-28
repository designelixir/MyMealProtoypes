/* eslint-disable no-unused-vars */
const {
  Op,
  models: { User },
} = require("../../db");
const pkg = require("../../../package.json");

const requireToken = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.cookies[`token-${pkg.name}`]);
    next();
  } catch (e) {
    next(e);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    req.user = await User.isAdmin(req.cookies[`token-${pkg.name}`]);
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
