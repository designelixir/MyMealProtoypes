/* eslint-disable no-unused-vars */
const router = require("express").Router();

const {
  Op,
  models: {
    User,
    Corporation,
    Restaurant,
    Location,
    Menu,
    Category,
    MenuItem,
    Allergy,
    AllergyType,
  },
} = require("../db");

const { requireToken } = require("./utils/middleware");

/**
 * GET /
 * All Allergies
 */
router.get("/", async (req, res, next) => {
  try {
    res.json(await Allergy.findAll());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
