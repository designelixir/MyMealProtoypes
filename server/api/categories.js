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
const { categoryIncluder } = require("./utils/includers");

const { requireToken, isAdmin } = require("./utils/middleware");

router.get("/:categoryId", requireToken, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    res.json(await Category.findByPk(categoryId, categoryIncluder));
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/:categoryId/menuitems", requireToken, async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const { menuItem, allergyTypes } = req.body;
    const createdMenuItem = await MenuItem.create({ ...menuItem, categoryId });

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
});

module.exports = router;
