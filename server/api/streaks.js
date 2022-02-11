/* eslint-disable no-unused-vars */
const router = require("express").Router();

const {
  Op,
  models: { User, Question, Tag, Streak, UserAnswered },
} = require("../db");

const { requireToken, isAgentOfUser } = require("./middleware");

/**
 * POST /
 * Create streak with userAnswered questions
 */
router.post("/", requireToken, async (req, res, next) => {
  try {
    const answeredQuestions = req.body;

    let score = answeredQuestions.length - 1;

    const streak = await Streak.create({ score, userId: req.user.id });

    for (const question of answeredQuestions) {
      await UserAnswered.create({
        ...question,
        userId: req.user.id,
        streakId: streak.id,
      });
    }

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
