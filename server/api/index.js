const router = require("express").Router();

router.use("/allergies", require("./allergies"));
router.use("/menus", require("./menus"));
router.use("/corporations", require("./corporations"));
router.use("/restaurants", require("./restaurants"));
router.use("/categories", require("./categories"));
router.use("/menuitems", require("./menuitems"));
router.use("/invitations", require("./invitations"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
