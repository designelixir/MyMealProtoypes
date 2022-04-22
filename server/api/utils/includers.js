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
  ],
  include: [
    { model: Image, as: "logo" },
    { model: Image, as: "bg" },
    {
      model: Location,
      where: { id: locationId },
      include: [
        {
          model: Menu,
          include: [
            { model: Allergy, attributes: ["id", "name"] },
            {
              model: Category,
              where: { archived: false },
              include: {
                model: MenuItem,
                where: { archived: false },
                include: [
                  Image,
                  PriceType,
                  { model: AllergyType, include: [Allergy] },
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
