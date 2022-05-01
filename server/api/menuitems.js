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
    PriceType,
    Allergy,
    AllergyType,
  },
} = require("../db");
const { menuitemIncluder } = require("./utils/includers");

const {
  requireToken,
  isAdmin,
  s3Client,
  upload,
} = require("./utils/middleware");

router.get("/:menuitemId", requireToken, async (req, res, next) => {
  try {
    const { menuitemId } = req.params;
    res.json(await MenuItem.findByPk(menuitemId, menuitemIncluder));
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.put("/:menuitemId", requireToken, upload, async (req, res, next) => {
  try {
    const { menuitemId } = req.params;

    const { menuItem, priceType, priceTypes, allergyTypes } = JSON.parse(
      req.body.data
    );

    const mi = await MenuItem.findByPk(menuitemId, menuitemIncluder);
    if (req.files.length == 1) {
      const [menuitemImage] = req.files;
      await mi.createImage({
        url: menuitemImage.location,
        key: menuitemImage.key,
      });
    }

    await mi.update({ ...menuItem, type: priceType });

    await Promise.all(mi.pricetypes.map((pt) => pt.destroy()));
    if (priceType === "Variation") {
      for (const pt of Object.values(priceTypes)) {
        await PriceType.create({ ...pt, menuitemId });
      }
    }

    await Promise.all(mi.allergytypes.map((at) => at.destroy()));
    const menuItemAllergies = [];
    for (const allergyId in allergyTypes) {
      const { id } = await AllergyType.create({
        ...allergyTypes[allergyId],
        allergyId,
      });
      menuItemAllergies.push(id);
    }
    await mi.addAllergytypes(menuItemAllergies);

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/:menuitemId/images", requireToken, async (req, res, next) => {
  try {
    const { menuitemId } = req.params;
    const awsClient = s3Client();

    const menuitem = await MenuItem.findByPk(menuitemId);
    const image = await menuitem.getImage();

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

module.exports = router;
