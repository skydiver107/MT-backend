module.exports = (sequelize, Sequelize) => {
  const AccessToken = sequelize.define("accessToken", {
    userId: {
      type: Sequelize.INTEGER,
    },
    token: {
      type: Sequelize.STRING,
    },
    expiresAt: {
      type: Sequelize.INTEGER,
    },
  });

  return AccessToken;
};
