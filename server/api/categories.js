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
const { categoryIncluder } = require("./utils/includers");

const { requireToken, isAdmin, upload } = require("./utils/middleware");

router.get("/:categoryId", requireToken, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    res.json(await Category.findByPk(categoryId, categoryIncluder));
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post(
  "/:categoryId/menuitems",
  requireToken,
  upload,
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      const { menuItem, priceType, priceTypes, allergyTypes } = JSON.parse(
        req.body.data
      );

      const createdMenuItem = await MenuItem.create({
        ...menuItem,
        type: priceType,
        categoryId,
      });

      const [menuitemImage] = req.files;
      await createdMenuItem.createImage({
        url: menuitemImage.location,
        key: menuitemImage.key,
      });

      if (priceType === "Variation") {
        for (const pt of Object.values(priceTypes)) {
          await PriceType.create({ ...pt, menuitemId: createdMenuItem.id });
        }
      }

      const menuItemAllergies = [];
      for (const allergyId in allergyTypes) {
        const { id } = await AllergyType.create({
          ...allergyTypes[allergyId],
          allergyId,
        });
        menuItemAllergies.push(id);
      }
      await createdMenuItem.addAllergytypes(menuItemAllergies);

      res.json(await Category.findByPk(categoryId, categoryIncluder));
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
