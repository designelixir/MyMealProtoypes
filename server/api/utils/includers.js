const {
  Op,
  models: {
    User,
    Corporation,
    Restaurant,
    Menu,
    Allergy,
    Category,
    MenuItem,
    PriceType,
    AllergyType,
  },
} = require("../../db");

const corporationIncluder = {
  include: [Restaurant],
};

const restaurantIncluder = {
  include: [Corporation, Menu],
};

const menuIncluder = {
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
