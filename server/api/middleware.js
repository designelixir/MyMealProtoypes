/* eslint-disable no-unused-vars */
const {
  Op,
  models: { User, Agent, Transaction, Client },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.cookies.token);
    next();
  } catch (e) {
    next(e);
  }
};

const isAgentOfUser = async (req, res, next) => {
  try {
    const { agentId } = req.params;
    await req.user.ownsAgent(agentId);
    req.agentId = agentId;
    next();
  } catch (e) {
    next(e);
  }
};

const isClientOfAgent = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const client = await Client.findByPk(clientId);

    const agent = await Agent.findByPk(req.agentId);
    await agent.ownsClient(client);

    req.clientId = clientId;
    next();
  } catch (e) {
    next(e);
  }
};

const isTransactionOfAgent = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findByPk(transactionId);

    const agent = await Agent.findByPk(req.agentId);

    await agent.ownsTransaction(transaction);

    req.transactionId = transactionId;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  requireToken,
  isAgentOfUser,
  isClientOfAgent,
  isTransactionOfAgent,
};
