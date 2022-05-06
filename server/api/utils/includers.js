const {
  Op,
  models: {
    User,
    Corporation,
    Restaurant,
    Location,
    Image,
    Menu,
    Allergy,
    Category,
    MenuItem,
    PriceType,
    AllergyType,
  },
} = require("../../db");

const restaurantIncluder = {
  include: [
    { model: Image, as: "logo" },
    { model: Image, as: "bg" },
    Corporation,
    Menu,
    Location,
  ],
};

const corporationIncluder = {
  include: [{ model: Restaurant, ...restaurantIncluder }],
};
const menuIncluder = {
  order: [[Category, "position", "ASC"]],
  include: [Allergy, Category, { model: Restaurant, ...restaurantIncluder }],
};

const menuitemIncluder = {
  include: [
    Image,
    {
      model: Category,
      attributes: ["name"],
      include: [
        {
          model: Menu,
          attributes: ["name"],
          include: [
            Allergy,
            {
              model: Restaurant,
              attributes: ["name"],
              include: [{ model: Corporation, attributes: ["name"] }],
            },
          ],
        },
      ],
    },
    PriceType,
    { model: AllergyType, include: [Allergy] },
  ],
};

const categoryIncluder = {
  order: [
    ["position", "ASC"],
    [MenuItem, "position", "ASC"],
  ],
  include: [
    {
      model: MenuItem,
      include: [Image, PriceType, { model: AllergyType, include: [Allergy] }],
    },
    {
      model: Menu,
      attributes: ["name"],
      include: [
        Allergy,
        { model: Category, attributes: ["name", "id"] },
        {
          model: Restaurant,
          attributes: ["name"],
          include: [{ model: Corporation, attributes: ["name"] }],
        },
      ],
    },
  ],
};

const locationIncluder = {
  include: [{ model: Menu, ...menuIncluder }],
};

const frontendIncluder = (locationId) => ({
  order: [
    [Location, Menu, Category, "position", "ASC"],
    [Location, Menu, Category, MenuItem, "position", "ASC"],
    [Location, Menu, Category, MenuItem, AllergyType, Allergy, "name", "ASC"],
  ],
  attributes: ["id", "name", "crossContactProcedure", "primaryColor"],
  include: [
    { model: Image, as: "logo", attributes: ["url"] },
    { model: Image, as: "bg", attributes: ["url"] },
    {
      model: Location,
      attributes: [
        "id",
        "crossContactProcedure",
        "streetOne",
        "streetTwo",
        "city",
        "state",
        "zip",
        "country",
        "address",
      ],
      where: { id: locationId },
      include: [
        {
          model: Menu,
          attributes: ["name", "dedicatedFrom", "orderNow"],
          include: [
            { model: Allergy, attributes: ["id", "name"] },
            {
              model: Category,
              attributes: ["id", "name", "position", "archived"],
              where: { archived: false },
              include: {
                model: MenuItem,
                attributes: [
                  "id",
                  "name",
                  "description",
                  "ingredients",
                  "nutritionFacts",
                  "position",
                  "type",
                  "price",
                  "archived",
                ],
                where: { archived: false },
                include: [
                  { model: Image, attributes: ["url"] },
                  { model: PriceType, attributes: ["type", "price"] },
                  {
                    model: AllergyType,
                    attributes: [
                      "id",
                      "allergyId",
                      "type",
                      "cross",
                      "crossMod",
                      "modDescription",
                      "crossDescription",
                      "crossModDescription",
                    ],
                    include: [{ model: Allergy, attributes: ["id", "name"] }],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
});
module.exports = {
  corporationIncluder,
  restaurantIncluder,
  menuIncluder,
  locationIncluder,
  categoryIncluder,
  menuitemIncluder,
  frontendIncluder,
};
