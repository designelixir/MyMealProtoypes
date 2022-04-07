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
const { restaurantIncluder } = require("./utils/includers");

const {
  requireToken,
  isAdmin,
  s3Client,
  upload,
} = require("./utils/middleware");

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

router.put("/:restaurantId/images", requireToken, async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { type } = req.body;
    const awsClient = s3Client();

    const restaurant = await Restaurant.findByPk(restaurantId);
    const image = await restaurant[`get${type}`]();

    const bucketParams = {
      Bucket: "my-meal-images",
      Key: image.key,
    };
    awsClient.deleteObject(bucketParams, function (error, data) {
      if (error) {
        res.status({ error: "Something went wrong" });
      }
      console.log("Successfully deleted file", data);
    });
    await image.destroy();

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.put("/:restaurantId", requireToken, upload, async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    console.log(req.body);
    console.log(req.files);

    const restaurantData = JSON.parse(req.body.restaurantData);

    const restaurant = await Restaurant.findByPk(restaurantId);
    await restaurant.update(restaurantData);

    const deleted = JSON.parse(req.body.deleted);

    if (deleted.Logo && deleted.Bg) {
      const [logo, bg] = req.files;
      await Promise.all([
        restaurant.createLogo({ url: logo.location, key: logo.key }),
        restaurant.createBg({ url: bg.location, key: bg.key }),
      ]);
    } else if (deleted.Logo) {
      const [logo] = req.files;
      await restaurant.createLogo({ url: logo.location, key: logo.key });
    } else if (deleted.Bg) {
      const [bg] = req.files;
      await restaurant.createBg({ url: bg.location, key: bg.key });
    }

    res.json(await Restaurant.findByPk(restaurantId, restaurantIncluder));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
