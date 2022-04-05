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

const { requireToken, isAdmin, upload } = require("./utils/middleware");

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
    const corporation = await Corporation.create(req.body, corporationIncluder);
    res.json(corporation);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/:corporationId/restaurants",
  requireToken,
  upload,
  async (req, res, next) => {
    try {
      const { corporationId } = req.params;
      console.log(req.body);
      console.log(req.files);
      const restaurantData = JSON.parse(req.body.restaurantData);
      const [logo, bg] = req.files;
      console.log(restaurantData, logo, bg);

      const restaurant = await Restaurant.create(restaurantData);
      await Promise.all([
        restaurant.createLogo({ url: logo.location, key: logo.key }),
        restaurant.createBg({ url: bg.location, key: bg.key }),
      ]);
      res.json(await Corporation.findByPk(corporationId, corporationIncluder));
    } catch (err) {
      next(err);
    }
  }
);
//upload.single("file")
router.post("/upload", requireToken, upload, async (req, res, next) => {
  try {
    console.log(req.body);
    // const { listingData } = req.body;
    // const listing = await Listing.create(JSON.parse(listingData));
    // await listing.setUser(req.user);
    // for (file of req.files) {
    //   const image = await Image.create({ url: file.location });
    //   await listing.addImage(image);
    // }
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
