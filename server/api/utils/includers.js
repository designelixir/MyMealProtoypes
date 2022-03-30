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

const categoryIncluder = {
  include: [
    { model: MenuItem, include: [{ model: AllergyType, include: [Allergy] }] },
    { model: Menu, ...menuIncluder },
  ],
};

module.exports = {
  corporationIncluder,
  restaurantIncluder,
  menuIncluder,
  categoryIncluder,
};
