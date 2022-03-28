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
const { restaurantIncluder } = require("./utils/includers");

const { requireToken, isAdmin } = require("./utils/middleware");

router.get("/:restaurantId", requireToken, async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    res.json(await Restaurant.findByPk(restaurantId, restaurantIncluder));
  } catch (err) {
    next(err);
  }
});

router.post("/:restaurantId/menus", requireToken, async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { data, allergyIds } = req.body;
    const menu = await Menu.create(data);
    await menu.addAllergies(allergyIds);

    res.json(await Restaurant.findByPk(restaurantId, restaurantIncluder));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
