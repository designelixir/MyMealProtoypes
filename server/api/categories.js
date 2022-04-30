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
const { categoryIncluder, menuIncluder } = require("./utils/includers");

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

router.put("/:categoryId/menus/:menuId", async (req, res, next) => {
  try {
    const { categoryId, menuId } = req.params;

    await Category.update(req.body, { where: { id: categoryId } });

    res.json(await Menu.findByPk(menuId, menuIncluder));
  } catch (err) {
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
      if (menuitemImage) {
        await createdMenuItem.createImage({
          url: menuitemImage.location,
          key: menuitemImage.key,
        });
      }

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

router.put("/:categoryId/menuitems/swap", async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const { menuitemOne, menuitemTwo } = req.body;
    await Promise.all([
      MenuItem.update(
        { position: menuitemOne.position },
        { where: { id: menuitemOne.id } }
      ),
      MenuItem.update(
        { position: menuitemTwo.position },
        { where: { id: menuitemTwo.id } }
      ),
    ]);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:categoryId/menuitems/:menuitemId/archived",
  async (req, res, next) => {
    try {
      const { categoryId, menuitemId } = req.params;

      await MenuItem.update(req.body, { where: { id: menuitemId } });

      res.json(await Category.findByPk(categoryId, categoryIncluder));
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:categoryId/menuitems/:menuitemId/duplicate",
  async (req, res, next) => {
    try {
      const { categoryId, menuitemId } = req.params;
      const startingPosition = await Category.findByPk(categoryId, {
        include: [MenuItem],
      }).then(({ menuitems }) => menuitems.length);
      const menuitem = await MenuItem.findByPk(menuitemId, {
        include: [PriceType, { model: AllergyType, include: [Allergy] }],
      });

      const {
        name,
        description,
        ingredients,
        nutritionFacts,
        type,
        price,
        pricetypes,
        allergytypes,
      } = menuitem;
      const newMenuitem = await MenuItem.create({
        name,
        description,
        ingredients,
        nutritionFacts,
        type,
        price,
        position: startingPosition,
        categoryId,
      });
      if (type === "Variation") {
        for (const pt of pricetypes) {
          const { type, price } = pt;
          await PriceType.create({
            type,
            price,
            menuitemId: newMenuitem.id,
          });
        }
      }
      const menuItemAllergies = [];
      for (const allergytype of allergytypes) {
        const {
          type,
          cross,
          crossMod,
          modDescription,
          crossDescription,
          crossModDescription,
          allergyId,
        } = allergytype;

        const { id } = await AllergyType.create({
          type,
          cross,
          crossMod,
          modDescription,
          crossDescription,
          crossModDescription,
          allergyId,
        });
        menuItemAllergies.push(id);
      }

      await newMenuitem.addAllergytypes(menuItemAllergies);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
