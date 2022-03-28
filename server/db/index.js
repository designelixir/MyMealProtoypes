//this is the access point for all things database related!
const { Op } = require("sequelize");
const db = require("./db");

const {
  User,
  Corporation,
  Restaurant,
  Location,
  Menu,
  Category,
  MenuItem,
  Allergy,
  AllergyType,
  Token,
} = require("./models");

User.hasOne(Token);
Token.belongsTo(User);

User.hasOne(Corporation);
Corporation.belongsTo(User);

Corporation.hasMany(Restaurant);
Restaurant.belongsTo(Corporation);

Restaurant.hasMany(Location);
Location.belongsTo(Restaurant);

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Menu.belongsToMany(Location, { through: "location-menu" });

Menu.belongsToMany(Allergy, { through: "menu-allergies" });

Menu.hasMany(Category);
Category.belongsTo(Menu);

Category.hasMany(MenuItem);
MenuItem.belongsTo(Category);

AllergyType.belongsTo(Allergy);
// Allergy.belongsToMany(AllergyType, { through: "allergy-allergyType" });

MenuItem.belongsToMany(AllergyType, { through: "menuitem-allergyType" });
// AllergyType.belongsTo(MenuItem);

module.exports = {
  db,
  Op,
  models: {
    User,
    Corporation,
    Restaurant,
    Location,
    Menu,
    Category,
    MenuItem,
    Allergy,
    AllergyType,
    Token,
  },
};
