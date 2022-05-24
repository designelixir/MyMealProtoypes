/* eslint-disable no-unused-vars */
const router = require("express").Router();

const {
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
} = require("../db");

const { requireToken, isAdmin } = require("./utils/middleware");
const mailer = require("../../mailer/email");
/**
 * GET /
 * All Allergies
 */
router.post("/", isAdmin, async (req, res, next) => {
  try {
    const { email, corporationId } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { email, role: "Corporation" },
      include: [Token],
    });
    // const user = await User.create({ email, role: "Corporation" });
    if (created) {
      await user.setCorporation(corporationId);
      const token = await Token.create({ userId: user.id });
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? process.env.PROD_BASE_URL
          : process.env.DEV_BASE_URL;

      mailer({
        to: email,
        subject: "Invite",
        text: `Click on link to register account: ${baseUrl}/invite/${token.accessToken}`,
      });
      res.sendStatus(204);
    } else {
      if (user.token) {
        await user.token.destory();
      }
      const token = await Token.create({ userId: user.id });
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? process.env.PROD_BASE_URL
          : process.env.DEV_BASE_URL;

      mailer({
        to: email,
        subject: "Invite",
        text: `Click on link to register account: ${baseUrl}/invite/${token.accessToken}`,
      });
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { accessToken } = req.query;
    const token = await Token.findOne({ where: { accessToken } });
    if (!token || token.hasExpired) {
      if (token && token.hasExpired) {
        await token.destroy();
      }
      const error = Error("Invalid token");
      error.status = 401;
      throw error;
    }
    res.json(token.userId);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
