module.exports = (sequelize, Sequelize) => {
  const StripeCard = sequelize.define("stripe", {
    email: {
      type: Sequelize.STRING,
    },
    customerId: {
      type: Sequelize.STRING,
    },
  });

  return StripeCard;
};
