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

    console.log(req.body);
    await mi.update({ ...menuItem, type: priceType });

    const ptPromises = mi.pricetypes.map((pt) => pt.destroy());
    // console.log(mi.__proto__);
    await Promise.all(ptPromises);
    // await mi.removePricetypes(currentPriceTypeIds)
    if (priceType === "Variation") {
      for (const pt of Object.values(priceTypes)) {
        await PriceType.create({ ...pt, menuitemId });
      }
    }
    console.log(mi.allergytypes);
    const atPromises = mi.allergytypes.map((at) => at.destroy());
    // console.log(mi.__proto__);
    await Promise.all(atPromises);
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
