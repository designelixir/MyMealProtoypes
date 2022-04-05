const {
  Op,
  models: {
    User,
    Corporation,
    Restaurant,
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
    { model: Category, include: [{ model: Menu, ...menuIncluder }] },
    PriceType,
    { model: AllergyType, include: [Allergy] },
  ],
};

const categoryIncluder = {
  order: [["position", "ASC"]],
  include: [
    {
      model: MenuItem,
      include: [PriceType, { model: AllergyType, include: [Allergy] }],
    },
    { model: Menu, ...menuIncluder },
  ],
};

module.exports = {
  corporationIncluder,
  restaurantIncluder,
  menuIncluder,
  categoryIncluder,
  menuitemIncluder,
};
