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
module.exports = {
  corporationIncluder,
  restaurantIncluder,
  menuIncluder,
  locationIncluder,
  categoryIncluder,
  menuitemIncluder,
};
