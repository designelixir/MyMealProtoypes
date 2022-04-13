/* eslint-disable no-unused-vars */
const router = require("express").Router();

const {
  Op,
  models: {
    User,
    Corporation,
    Restaurant,
    Image,
    Location,
    Menu,
    Category,
    MenuItem,
    Allergy,
    AllergyType,
  },
} = require("../db");
const { locationIncluder } = require("./utils/includers");

const { requireToken } = require("./utils/middleware");

router.get("/:locationId", requireToken, async (req, res, next) => {
  try {
    const { locationId } = req.params;
    res.json(await Location.findByPk(locationId, locationIncluder));
  } catch (err) {
    next(err);
  }
});

router.put("/:locationId", requireToken, async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const { locationData, locationMenuId } = req.body;

    const location = await Location.findByPk(locationId);

    await location.update(locationData);

    await location.setMenu(locationMenuId);

    res.json(await Location.findByPk(locationId, locationIncluder));
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
