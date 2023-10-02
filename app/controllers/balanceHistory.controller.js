const db = require("../models");
const query = require("../config/query.config");
const BalanceHistory = db.balanceHistory;
const User = db.user;
const PlaidUserModel = db.plaid;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  selectStatement,
  whereStatement,
  pageStatement,
  queryBuilder,
} = require("../config/query.config");

const Op = db.Sequelize.Op;

exports.getBalanceHistory = async (req, res) => {
  const perPage = req.query.perPage;
  const currentPage = req.query.currentPage;

  const balanceHistorySelect = ["balanceHistories.*", "users.username"];

  const balanceHistoryQuery = queryBuilder(
    selectStatement(balanceHistorySelect),
    'FROM balanceHistories LEFT JOIN users ON balanceHistories."userId" = users."id"',
    "",
    'ORDER BY balanceHistories."updatedAt" DESC',
    pageStatement(perPage, currentPage)
  );

  const [results, metadata] = await db.sequelize.query(balanceHistoryQuery);

  if (!!perPage) {
    const totalBalanceHistoryQuery = query.queryBuilder(
      selectStatement(balanceHistorySelect),
      'FROM balanceHistories LEFT JOIN users ON balanceHistories."userId" = users."id"',
      "",
      'ORDER BY balanceHistories."updatedAt" DESC',
      ""
    );

    const [totalBalanceHistory, metadata] = await db.sequelize.query(
      totalBalanceHistoryQuery
    );
    const totalCount = totalBalanceHistory.length;
    const totalPage = Math.ceil(totalCount / perPage);

    return res.status(200).send({
      data: results,
      totalPage: totalPage,
      totalCount: totalCount,
      success: true,
    });
  }

  return res.status(200).send({
    data: results,
    success: true,
  });
};

exports.createBalanceHistory = async (req, res) => {
  const userId = req.body.userId;
  const actionType = req.body.actionType;
  const amount = req.body.amount;

  if (
    userId == undefined ||
    userId == null ||
    userId <= 0 ||
    actionType == undefined ||
    actionType == null ||
    (actionType != 0 && actionType != 1) ||
    amount == undefined ||
    amount == null ||
    amount < 0
  ) {
    return res
      .status(500)
      .send({ success: false, message: "Please provide correct information." });
  }

  const user = await User.findAll({ where: { id: userId } });

  if (user.length == 0) {
    return res
      .status(500)
      .send({ success: false, message: "There is not user." });
  }

  const newBalanceHistory = await BalanceHistory.create({
    userId: userId,
    actionType: actionType,
    amount: amount,
  });

  if (newBalanceHistory)
    return res.status(200).send({
      message: "New balance history is successfully created.",
      success: true,
    });
  else
    return res.status(500).send({
      message: "Cannot create a balance history.",
      success: false,
    });
};

exports.updateBalanceHistory = async (req, res) => {
  const id = req.params.id;

  if (id == undefined || id == null || id <= 0) {
    return res.status(500).send({
      success: false,
      message: "Please provide correct information to update data.",
    });
  }

  const userId = req.body.userId;

  if (userId !== undefined && userId !== null && userId > 0) {
    const user = await User.findAll({ where: { id: userId } });

    if (user.length == 0) {
      return res
        .status(500)
        .send({ success: false, message: "There is not user." });
    }
  }

  const result = await BalanceHistory.update(req.body, {
    where: { id: id },
  });

  if (result) {
    return res.status(200).send({
      message: "Balance history updated successfully.",
      success: true,
    });
  } else {
    return res.status(500).send({
      message: `Cannot update balance history with id=${id}.`,
      success: false,
    });
  }
};

exports.deleteBalanceHistory = async (req, res) => {
  const id = req.params.id;

  if (id == undefined || id == null || id <= 0) {
    return res
      .status(500)
      .send({ success: false, message: "Failed deleting balance history." });
  }

  const result = await BalanceHistory.destroy({
    where: { id: id },
  });

  if (result) {
    return res.status(200).send({
      message: "Balance history was deleted successfully.",
      success: true,
    });
  } else {
    return res.status(500).send({
      message: `Cannot delete balance history with id=${id}.`,
      success: false,
    });
  }
};

exports.balanceTransfer = async (req, res) => {
  const userId = req.body.userId;
  const actionType = req.body.actionType;
  const amount = Number(req.body.amount);
  const tx_name = req.body.name;
  const itemId = req.body.itemId;
  const paymentMethod = req.body.paymentMethod;
  const customerId = req.body.customerId;
  const cardId = req.body.cardId;

  if (
    userId == undefined ||
    userId == null ||
    userId <= 0 ||
    actionType == undefined ||
    actionType == null ||
    (actionType != 0 && actionType != 1) ||
    amount == undefined ||
    amount == null ||
    amount < 0
  ) {
    return res
      .status(500)
      .send({ success: false, message: "Please provide correct information." });
  }

  const user = await User.findAll({ where: { id: userId } });
  if (user.length == 0) {
    return res
      .status(500)
      .send({ success: false, message: "There is not a user." });
  }

  // detects transaction type
  if (tx_name == "MTC") {
    const updatedMTCToken = Number(user[0].mtcAmount) + amount;
    let result = true;
    const userUpdateResult = await User.update(
      { mtcAmount: updatedMTCToken },
      {
        where: { id: userId },
      }
    );

    result &= Boolean(userUpdateResult[0]);

    const balanceHistoryResult = await BalanceHistory.create({
      userId: userId,
      actionType: actionType,
      amount: amount,
      itemId: itemId,
      paymentMethod: paymentMethod,
      customerId: customerId,
      cardId: cardId,
    });

    result &= Boolean(balanceHistoryResult.dataValues.id);

    if (result)
      return res.status(200).send({
        updatedMTCToken: updatedMTCToken,
        message: "New balance transfer is successfully created.",
        success: true,
      });
    else
      return res.status(500).send({
        message: "Cannot transfer a balance.",
        success: false,
      });
  }
};

exports.getAllBalanceHistory = async (req, res) => {
  try {
    const balanceHistory = await BalanceHistory.findAll({
      where: { userId: req.body.userId },
      order: [["createdAt", "ASC"]],
    });

    const today = new Date();

    let histories = [];
    if (balanceHistory) {
      balanceHistory.forEach(async function (history) {
        if (history.paymentMethod == "stripe") {
          const card = await stripe.customers.retrieveSource(
            history.customerId,
            history.cardId
          );

          const createdDate = history.createdAt;
          const diffMs = Math.round(
            (((today - createdDate) % 86400000) % 3600000) / 60000
          );
          const diffHrs = Math.floor(
            ((today - createdDate) % 86400000) / 3600000
          );
          const diffDays = Math.floor(
            (today - createdDate) / 1000 / 60 / 60 / 24
          );

          // console.log("different mins", diffHrs, diffDays, today - createdDate);

          histories.push({
            paymentMethod: "stripe",
            brand: card.brand,
            last4: card.last4,
            amount: history.amount,
            diffMs: diffMs,
            diffHrs: diffHrs,
            diffDays: diffDays,
            diffSecs: today - createdDate,
            name: card.name,
          });
        }

        if (history.paymentMethod == "plaid") {
          const itemId = history.itemId;
          const bankAccount = await PlaidUserModel.findOne({
            where: { itemId: itemId },
          });

          const createdDate = history.createdAt;
          const diffMs = Math.round(
            (((today - createdDate) % 86400000) % 3600000) / 60000
          );

          const diffHrs = Math.floor(
            ((today - createdDate) % 86400000) / 3600000
          );
          const diffDays = Math.floor(
            (today - createdDate) / 1000 / 60 / 60 / 24
          );

          histories.push({
            paymentMethod: "plaid",
            institutionName: bankAccount?.institutionName,
            accountName: bankAccount?.accountName,
            last4: bankAccount?.last4,
            amount: history.amount,
            diffMs: diffMs,
            diffHrs: diffHrs,
            diffDays: diffDays,
            diffSecs: today - createdDate,
          });
        }
      });
    }

    await new Promise((resolve, reject) => setTimeout(resolve, 4000));
    histories.sort((a, b) => a.diffSecs - b.diffSecs);
    res.status(200).send({ history: histories });
  } catch (e) {
    res.status(500).send({ success: false });
  }
};

exports.getPlaidBalanceHistory = async (req, res) => {
  BalanceHistory.findAll({
    where: { userId: req.body.userId, itemId: { [Op.not]: null } },
    order: [["createdAt", "DESC"]],
  })
    .then((history) => res.json({ history: history }))
    .catch((err) => res.json({ error: err }));
};

exports.getBankAccountbyItemId = async (req, res) => {
  PlaidUserModel.findAll({ where: { itemId: req.body.itemId } })
    .then((accounts) => res.json({ accounts: accounts }))
    .catch((err) => res.json({ error: err }));
};

exports.getBankAccountByUserId = async (req, res) => {
  PlaidUserModel.findAll({ where: { userId: req.body.userId } })
    .then((accounts) => res.json({ accounts: accounts }))
    .catch((err) => res.json({ error: err }));
};
