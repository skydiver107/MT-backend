module.exports = (sequelize, Sequelize) => {
  const BalanceHistory = sequelize.define("balanceHistory", {
    userId: {
      type: Sequelize.INTEGER,
    },
    actionType: {
      type: Sequelize.INTEGER,
    },
    amount: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
    itemId: {
      type: Sequelize.STRING,
    },
    paymentMethod: {
      type: Sequelize.STRING,
    },
    cardId: {
      type: Sequelize.STRING,
    },
    customerId: {
      type: Sequelize.STRING,
    },
  });
  return BalanceHistory;
};
