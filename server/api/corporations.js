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
const { corporationIncluder } = require("./utils/includers");

const { requireToken, isAdmin } = require("./utils/middleware");

/**
 * GET /
 * All Allergies
 */
router.get("/", isAdmin, async (req, res, next) => {
  try {
    res.json(await Corporation.findAll());
  } catch (err) {
    next(err);
  }
});

router.get("/:corporationId", requireToken, async (req, res, next) => {
  try {
    const { corporationId } = req.params;
    res.json(await Corporation.findByPk(corporationId, corporationIncluder));
  } catch (err) {
    next(err);
  }
});

router.get("/users/corporations", requireToken, async (req, res, next) => {
  try {
    res.json(await req.user.getCorporation(corporationIncluder));
  } catch (err) {
    next(err);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    const corporationData = req.body;
    const corporation = await Corporation.create(
      corporationData,
      corporationIncluder
    );
    res.json(corporation);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/:corporationId/restaurants",
  requireToken,
  async (req, res, next) => {
    try {
      const { corporationId } = req.params;

      await Restaurant.create(req.body);
      res.json(await Corporation.findByPk(corporationId, corporationIncluder));
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
