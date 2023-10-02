const db = require("../models");
const query = require("../config/query.config");
const Transaction = db.transaction;
const User = db.user;
const {
  selectStatement,
  whereStatement,
  pageStatement,
  queryBuilder,
} = require("../config/query.config");

const Op = db.Sequelize.Op;

exports.getTransactions = async (req, res) => {
  const perPage = req.query.perPage;
  const currentPage = req.query.currentPage;

  const fromSelect = ['transactions."id"', "users.username"];

  const fromQuery = queryBuilder(
    selectStatement(fromSelect),
    'FROM transactions LEFT JOIN users ON CAST ( transactions."from" AS INTEGER ) = users."id"',
    "",
    "",
    ""
  );

  const toSelect = ['transactions."id"', "users.username"];

  const toQuery = queryBuilder(
    selectStatement(toSelect),
    'FROM transactions LEFT JOIN users ON CAST ( transactions."to" AS INTEGER ) = users."id"',
    "",
    "",
    ""
  );

  const transactionSelect = [
    'transactions."id"',
    'transactions."from"',
    "t_from.username AS from_name",
    'transactions."to"',
    "t_to.username AS to_name",
    "transactions.amount",
    'transactions."createdAt"',
    'transactions."updatedAt"',
  ];

  const transactionQuery = query.queryBuilder(
    selectStatement(transactionSelect),
    "FROM transactions " +
      "LEFT JOIN ( " +
      fromQuery +
      ' ) AS t_from ON transactions."id" = t_from."id" ' +
      "LEFT JOIN ( " +
      toQuery +
      ' ) AS t_to ON transactions."id" = t_to."id" ',
    "",
    'ORDER BY transactions."updatedAt" DESC',
    pageStatement(perPage, currentPage)
  );

  const [results, metadata] = await db.sequelize.query(transactionQuery);

  if (!!perPage) {
    const totalTransactionQuery = query.queryBuilder(
      selectStatement(transactionSelect),
      "FROM transactions " +
        "LEFT JOIN ( " +
        fromQuery +
        ' ) AS t_from ON transactions."id" = t_from."id" ' +
        "LEFT JOIN ( " +
        toQuery +
        ' ) AS t_to ON transactions."id" = t_to."id" ',
      "",
      'ORDER BY transactions."updatedAt" DESC',
      ""
    );

    const [totalTransactions, metadata] = await db.sequelize.query(
      totalTransactionQuery
    );
    const totalCount = totalTransactions.length;
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
    totalPage: 1,
    totalCount: results.length,
    success: true,
  });
};

exports.createTransaction = async (req, res) => {
  const fromId = req.body.from;
  const toId = req.body.to;
  const amount = req.body.amount;

  if (amount == undefined || amount == null || amount < 0) {
    return res
      .status(500)
      .send({ success: false, message: "Please provide correct information." });
  }

  const newTransaction = await Transaction.create({
    from: fromId,
    to: toId,
    amount: amount,
  });

  if (newTransaction)
    return res.status(200).send({
      message: "New transaction is successfully created.",
      success: true,
    });
  else
    return res.status(500).send({
      message: "Cannot create a transaction.",
      success: false,
    });
};

exports.transfer = async (req, res) => {
  const fromId = req.body.from;
  const toId = req.body.to;
  const amount = req.body.amount;

  if (amount == undefined || amount == null || amount <= 0) {
    return res
      .status(500)
      .send({ success: false, message: "Please provide correct information." });
  }

  let fromUserUpdateResult = true,
    toUserUpdateResult = true,
    fromUser,
    toUser,
    fromUserAmount = 0,
    toUserAmount = 0;

  if (fromId === null && toId === null)
    return res.status(200).send({
      success: false,
      message: "User doesn't exist.",
    });

  if (fromId !== null && fromId > 0) {
    var fromCondition = fromId ? { id: fromId } : null;
    fromUser = await User.findOne({
      where: fromCondition,
    });

    if (fromUser.nbblAmount < amount)
      return res.status(200).send({
        success: false,
        message: "User token balance is not enough.",
      });

    if (fromUser !== null) {
      fromUserAmount = parseFloat(fromUser.nbblAmount) - parseFloat(amount);

      fromUserUpdateResult = await User.update(
        {
          nbblAmount: fromUserAmount,
        },
        {
          where: fromCondition,
        }
      );
    }
  }

  if (toId !== null && toId > 0) {
    var toCondition = toId ? { id: toId } : null;
    toUser = await User.findOne({
      where: toCondition,
    });
    if (toUser !== null) {
      toUserAmount = parseFloat(toUser.nbblAmount) + parseFloat(amount);

      toUserUpdateResult = await User.update(
        {
          nbblAmount: toUserAmount,
        },
        {
          where: toCondition,
        }
      );
    }
  }

  const newTransaction = await Transaction.create({
    from: fromId,
    to: toId,
    amount: amount,
  });

  if (newTransaction && toUserUpdateResult && fromUserUpdateResult)
    return res.status(200).send({
      fromAmount: fromUserAmount,
      toAmount: toUserAmount,
      message: "Transfer is successfully created.",
      success: true,
    });
  else
    return res.status(500).send({
      message: "Cannot transfer.",
      success: false,
    });
};

exports.updateTransaction = async (req, res) => {
  const id = req.params.id;

  if (id == undefined || id == null || id <= 0) {
    return res.status(500).send({
      success: false,
      message: "Please provide correct information to update data.",
    });
  }

  const result = await Transaction.update(req.body, {
    where: { id: id },
  });

  if (result) {
    return res.status(200).send({
      message: "Transaction updated successfully.",
      success: true,
    });
  } else {
    return res.status(500).send({
      message: `Cannot update transaction with id=${id}.`,
      success: false,
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  const id = req.params.id;

  if (id == undefined || id == null || id <= 0) {
    return res
      .status(500)
      .send({ success: false, message: "Failed deleting transaction." });
  }

  const result = await Transaction.destroy({
    where: { id: id },
  });

  if (result) {
    return res.status(200).send({
      message: "Transaction was deleted successfully.",
      success: true,
    });
  } else {
    return res.status(500).send({
      message: `Cannot delete transaction with id=${id}.`,
      success: false,
    });
  }
};
