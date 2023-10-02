module.exports = (sequelize, Sequelize) => {
  const ShippingAddress = sequelize.define("shippingAddress", {
    userId: {
      type: Sequelize.STRING,
    },
    address1: {
      type: Sequelize.STRING,
    },
    address2: {
      type: Sequelize.STRING,
    },
    address3: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    postalCode: {
      type: Sequelize.STRING,
    },
  });
  return ShippingAddress;
};
