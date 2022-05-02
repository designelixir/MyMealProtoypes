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
    Image,
    Category,
    MenuItem,
    PriceType,
    Allergy,
    AllergyType,
  },
} = require("../db");

const { frontendIncluder } = require("./utils/includers");

router.get(
  "/restaurants/:restaurantId/locations/:locationId",
  async (req, res, next) => {
    try {
      const { restaurantId, locationId } = req.params;

      const restaurant = await Restaurant.findByPk(
        restaurantId,
        frontendIncluder(locationId)
      );
      res.json(restaurant || {});
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

module.exports = router;
