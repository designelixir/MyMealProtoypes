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
    PriceType,
    Category,
    MenuItem,
    Allergy,
    AllergyType,
  },
} = require("../db");

const { menuIncluder } = require("./utils/includers");
const { requireToken, uploadCSV } = require("./utils/middleware");
const csvParser = require("./utils/csv/menu");

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

router.put("/:menuId", async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const { menuData, allergyIds } = req.body;

    await Menu.findByPk(menuId, {
      include: [Allergy],
    }).then(async (menu) => {
      const newAllergySet = new Set(allergyIds);

      const currentAllergyIds = await menu.allergies.map(({ id }) => id);

      for (const allergyId of currentAllergyIds) {
        if (!newAllergySet.has(allergyId)) {
          await menu.removeAllergy(allergyId);
        }
      }

      await Promise.all([menu.addAllergies(allergyIds), menu.update(menuData)]);
    });

    res.json(await Menu.findByPk(menuId, menuIncluder));
  } catch (err) {
    next(err);
  }
});

router.post(
  "/upload-csv/:menuId/:startingPosition",
  uploadCSV.single("file"),
  async (req, res, next) => {
    try {
      const { menuId, startingPosition } = req.params;
      const menu = await Menu.findByPk(menuId);
      const data = await csvParser(req.file.path);
      const categoriesNames = Object.keys(data);
      let position = parseInt(startingPosition);
      for (const categoryName of categoriesNames) {
        const category = await Category.create({
          name: categoryName,
          position: position++,
          menuId,
        });
        const menuitemNames = Object.keys(data[categoryName]);
        let menuitemPosition = 0;
        for (const menuitemName of menuitemNames) {
          const {
            description,
            ingredients,
            nutritionFacts,
            priceType,
            priceDetails,
          } = data[categoryName][menuitemName];
          const menuitem = await MenuItem.create({
            name: menuitemName,
            description,
            ingredients,
            nutritionFacts,
            position: menuitemPosition++,
            type: priceType,
            price: priceType === "Single" ? priceDetails : 0,
            categoryId: category.id,
          });

          if (priceType === "Variation") {
            for (const pt of Object.values(priceDetails)) {
              await PriceType.create({ ...pt, menuitemId: menuitem.id });
            }
          }

          const menuAllergies = await menu.getAllergies();

          const menuItemAllergies = [];
          for (const allergy of menuAllergies) {
            const { id } = await AllergyType.create({
              type: "Safe",
              cross: false,
              crossMod: false,
              modDescription: "",
              crossDescription: "",
              crossModDescription: "",
              allergyId: allergy.id,
            });
            menuItemAllergies.push(id);
          }

          await menuitem.addAllergytypes(menuItemAllergies);
        }
      }
      res.json(await Menu.findByPk(menuId, menuIncluder));
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

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
