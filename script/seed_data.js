module.exports = {
  user_seed_data: [
    {
      firstName: "admin",
      lastName: "",
      email: "admin@mymeal.io",
      role: "Admin",
      password: "12345678",
    },
    {
      firstName: "corporation",
      lastName: "",
      email: "corporation@mymeal.io",
      role: "Corporation",
      password: "12345678",
    },
  ],
  allergies_seed_data: [
    { name: "shellfish" },
    { name: "soy" },
    { name: "peanuts" },
    { name: "garlic" },
    { name: "egg" },
    { name: "dairy" },
  ],
  allergy_type_seed_data: [
    {
      type: "Unsafe",
      modDescription: "unsafe",
      crossDescription: "is crossed",
    },
    {
      type: "Cross Contaminated",
      modDescription: "crossed",
      crossDescription: "is crossed",
    },
    {
      type: "Modifiable",
      modDescription: "can mod",
      crossDescription: "is crossed",
    },
  ],
  menu_item_seed_data: [
    { name: "Ham", image: "image_url", description: "good ham", price: 10 },
    { name: "Cheese", image: "image_url", description: "oo cheese", price: 5 },
    { name: "Bacon", image: "image_url", description: "mmm bacon", price: 7 },
  ],
};
