module.exports = (sequelize, Sequelize) => {
  const Cakepayment = sequelize.define("cakepayment", {
    email: {
      type: Sequelize.STRING,
    },
    orderId: {
      type: Sequelize.STRING,
    },
  });

  return Cakepayment;
};
