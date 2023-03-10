//this is the access point for all things database related!
const { Op } = require("sequelize");
const db = require("./db");

const {
  User,
  Corporation,
  Restaurant,
  Image,
  Location,
  Menu,
  Category,
  MenuItem,
  PriceType,
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

Restaurant.hasOne(Image, { as: "logo", foreignKey: "logoRestaurant" });
Restaurant.hasOne(Image, { as: "bg", foreignKey: "bgRestaurant" });

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Menu.hasMany(Location);
Location.belongsTo(Menu);

Menu.belongsToMany(Allergy, { through: "menu-allergies" });

Menu.hasMany(Category);
Category.belongsTo(Menu);

Category.hasMany(MenuItem);
MenuItem.belongsTo(Category);

AllergyType.belongsTo(Allergy);
// Allergy.belongsToMany(AllergyType, { through: "allergy-allergyType" });

MenuItem.belongsToMany(AllergyType, { through: "menuitem-allergyType" });
// AllergyType.belongsTo(MenuItem);

MenuItem.hasMany(PriceType);
PriceType.belongsTo(MenuItem);

MenuItem.hasOne(Image);

module.exports = {
  db,
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
    PriceType,
    Allergy,
    AllergyType,
    Token,
  },
};
