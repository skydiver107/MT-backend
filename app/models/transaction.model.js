module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {
    from: {
      type: Sequelize.STRING
    },
    to: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.FLOAT
    },
  });

  return Transaction;
};
