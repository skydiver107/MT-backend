module.exports = (sequelize, Sequelize) => {
  const Plaid = sequelize.define("plaid", {
    userId: {
      type: Sequelize.STRING,
    },
    accessToken: {
      type: String,
      required: true,
    },
    itemId: {
      type: String,
      required: true,
    },
    institutionId: {
      type: String,
      required: true,
    },
    institutionName: {
      type: String,
    },
    accountName: {
      type: String,
    },
    accountType: {
      type: String,
    },
    accountSubtype: {
      type: String,
    },
    last4: {
      type: String,
    },
  });

  return Plaid;
};
