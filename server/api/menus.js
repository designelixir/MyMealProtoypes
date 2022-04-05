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

const { menuIncluder } = require("./utils/includers");
const { requireToken } = require("./utils/middleware");

router.get("/", async (req, res, next) => {
  try {
    res.json(await Menu.findAll(menuIncluder));
  } catch (err) {
    next(err);
  }
});

router.get("/:menuId", async (req, res, next) => {
  try {
    const { menuId } = req.params;
    res.json(await Menu.findByPk(menuId, menuIncluder));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { data, allergyIds } = req.body;
    const menu = await Menu.create(data);
    await menu.addAllergies(allergyIds);

    res.json(await Menu.findByPk(menu.id, menuIncluder));
  } catch (err) {
    next(err);
  }
});

router.post("/:menuId/categories", async (req, res, next) => {
  try {
    const { menuId } = req.params;

    await Category.create(req.body);

    res.json(await Menu.findByPk(menuId, menuIncluder));
  } catch (err) {
    next(err);
  }
});

router.put("/:menuId/categories/swap", async (req, res, next) => {
  try {
    const { menuId } = req.params;

    const { categoryOne, categoryTwo } = req.body;
    await Promise.all([
      Category.update(
        { position: categoryOne.position },
        { where: { id: categoryOne.id } }
      ),
      Category.update(
        { position: categoryTwo.position },
        { where: { id: categoryTwo.id } }
      ),
    ]);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /
 * Create streak with userAnswered questions
 */
router.post("/items", async (req, res, next) => {
  try {
    console.log(req.body);
    const { menuItemData, allergyTypes } = req.body;
    const menuItem = await MenuItem.create(menuItemData);
    const menuItemAllergies = [];
    for (const allergyId in allergyTypes) {
      const { type, description } = allergyTypes[allergyId];
      let created;
      if (type === "Cross Contact") {
        created = await AllergyType.create({
          type,
          crossDescription: description,
          allergyId,
        });
      } else if (type === "Modifiable") {
        created = await AllergyType.create({
          type,
          modDescription: description,
          allergyId,
        });
      } else {
        created = await AllergyType.create({ type, allergyId });
      }
      menuItemAllergies.push(created.id);
    }
    await menuItem.addAllergytypes(menuItemAllergies);

    res.json(
      await MenuItem.findByPk(menuItem.id, {
        include: [{ model: AllergyType, include: [Allergy] }],
      })
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
