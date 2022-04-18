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
    PriceType,
  },
} = require("../db");
const { restaurantIncluder, menuIncluder } = require("./utils/includers");

const {
  requireToken,
  isAdmin,
  s3Client,
  upload,
  uploadCSV,
} = require("./utils/middleware");
const csvParser = require("./utils/csv/location");

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

router.post(
  "/:restaurantId/menus/:menuId",
  requireToken,
  async (req, res, next) => {
    try {
      const { restaurantId, menuId } = req.params;

      const menu = await Menu.findByPk(menuId, {
        include: [
          Allergy,
          {
            model: Category,
            order: [["position", "ASC"]],
            include: [
              {
                model: MenuItem,
                include: [
                  PriceType,
                  { model: AllergyType, include: [Allergy] },
                ],
              },
            ],
          },
        ],
      }).then(async (menu) => {
        const { name, dedicatedFrom, orderNow, categories, allergies } = menu;
        const duplicateMenu = await Menu.create({
          name: `Copy of ${name}`,
          dedicatedFrom,
          orderNow,
          restaurantId,
        });
        await duplicateMenu.addAllergies(allergies.map(({ id }) => id));
        for (const category of categories) {
          const { name, position, menuitems } = category;
          const newCategory = await Category.create({
            name,
            position,
            menuId: duplicateMenu.id,
          });
          let menuitemPosition = 0;
          for (const menuitem of menuitems) {
            const {
              name,
              image,
              description,
              type,
              price,
              position,
              pricetypes,
              allergytypes,
            } = menuitem;
            const newMenuitem = await MenuItem.create({
              name,
              image,
              description,
              type,
              price,
              position,
              categoryId: newCategory.id,
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
          }
        }
      });

      res.json(await Restaurant.findByPk(restaurantId, restaurantIncluder));
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:restaurantId/locations",
  requireToken,
  async (req, res, next) => {
    try {
      const { restaurantId } = req.params;

      await Location.create(req.body);

      res.json(await Restaurant.findByPk(restaurantId, restaurantIncluder));
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:restaurantId/locations/:menuId",
  requireToken,
  uploadCSV.single("file"),
  async (req, res, next) => {
    try {
      const { restaurantId, menuId } = req.params;
      const locations = await csvParser(req.file.path);
      await Promise.all(
        locations.map((location) =>
          Location.create({ ...location, menuId, restaurantId })
        )
      );
      res.json(await Restaurant.findByPk(restaurantId, restaurantIncluder));
    } catch (err) {
      next(err);
    }
  }
);

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
