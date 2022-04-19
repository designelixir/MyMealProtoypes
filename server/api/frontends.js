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
    Allergy,
    AllergyType,
  },
} = require("../db");

const { requireToken } = require("./utils/middleware");

/**
 * GET /
 * All Allergies
 */
router.get(
  "/restaurants/:restaurantId/locations/:locationId",
  async (req, res, next) => {
    try {
      const { restaurantId, locationId } = req.params;

      const restaurant = await Restaurant.findByPk(restaurantId, {
        include: [
          { model: Image, as: "logo" },
          { model: Image, as: "bg" },
          {
            model: Location,
            where: { id: locationId },
            include: [
              {
                model: Menu,
                include: [{ model: Allergy, attributes: ["id", "name"] }],
              },
            ],
          },
        ],
      });
      res.json(restaurant || {});
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
