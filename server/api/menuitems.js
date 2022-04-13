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

const { requireToken, isAdmin } = require("./utils/middleware");

router.get("/:menuitemId", requireToken, async (req, res, next) => {
  try {
    const { menuitemId } = req.params;
    res.json(await MenuItem.findByPk(menuitemId, menuitemIncluder));
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.put("/:menuitemId", requireToken, async (req, res, next) => {
  try {
    const { menuitemId } = req.params;

    const { menuItem, priceType, priceTypes, allergyTypes } = req.body;

    const mi = await MenuItem.findByPk(menuitemId, menuitemIncluder);

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
    next(err);
  }
});

module.exports = router;
