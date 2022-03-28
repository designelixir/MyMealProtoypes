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
  include: [Menu],
};

const menuIncluder = {
  include: [Allergy, Category],
};

const categoryIncluder = {
  include: [
    { model: MenuItem, include: [{ model: AllergyType, include: [Allergy] }] },
    { model: Menu, include: [Allergy] },
  ],
};

module.exports = {
  corporationIncluder,
  restaurantIncluder,
  menuIncluder,
  categoryIncluder,
};
