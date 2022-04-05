/* eslint-disable no-unused-vars */
"use strict";

const {
  db,
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
  },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const {
    user_seed_data,
    allergies_seed_data,
    allergy_type_seed_data,
    menu_item_seed_data,
    price_type_seed_data,
  } = require("./seed_data");

  //Create Users in Database
  const allUsers = await User.bulkCreate(user_seed_data, {
    returning: true,
  });

  const allAllergies = await Allergy.bulkCreate(allergies_seed_data, {
    returning: true,
  });

  const restaurant = await Restaurant.create({
    name: "Test",
    crossContactProcedure: "Testing Only",
    primaryColor: "#912626ff",
  });

  const logo = await Image.create({ url: "fdsa", key: "123" });
  const bg = await Image.create({ url: "fdsa", key: "123" });
  console.log(restaurant.__proto__);
  // const allAllergyTypes = await AllergyType.bulkCreate(allergy_type_seed_data, {
  //   returning: true,
  // });

  // const allMenuItems = await MenuItem.bulkCreate(menu_item_seed_data, {
  //   returning: true,
  // });

  // const allPriceTypes = await PriceType.bulkCreate(price_type_seed_data, {
  //   returning: true,
  // });

  // const [admin] = allUsers;

  // const [shellfish, soy, peanuts, garlic, egg, dairy] = allAllergies;

  // const [unsafe, cross, mod] = allAllergyTypes;

  // const [ham, cheese, bacon] = allMenuItems;

  // await unsafe.setAllergy(shellfish);
  // await cross.setAllergy(soy);
  // await mod.setAllergy(peanuts);

  // await ham.addAllergytypes([unsafe, cross, mod]);

  // // await cheese.addAllergytype(cross);

  // // await cheese.addAllergytype(mod);

  // await ham.getAllergytypes({ include: [Allergy] }).then((allergyTypes) => {
  //   allergyTypes.forEach(({ allergy, type }) => {
  //     console.log(allergy.name, type);
  //   });
  // });
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
