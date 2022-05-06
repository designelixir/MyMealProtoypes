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

const {
  frontendIncluder,
  frontendRestaurantIncluder,
  frontendCategoryIncluder,
} = require("./utils/includers");

router.get(
  "/restaurants/:restaurantId/locations/:locationId",
  async (req, res, next) => {
    try {
      const { restaurantId, locationId } = req.params;

      const restaurant = await Restaurant.findByPk(
        restaurantId,
        frontendRestaurantIncluder(locationId)
      );
      res.json(restaurant || {});
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.get("/categories/:categoryId/menuitems", async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const menuitems = await Category.findByPk(
      categoryId,
      frontendCategoryIncluder
    ).then(({ menuitems }) => menuitems);
    res.json(menuitems);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
