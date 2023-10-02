module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define("notification", {
    userId: {
      type: Sequelize.STRING,
    },
    notification: {
      type: Sequelize.STRING,
    },
  });

  return Notification;
};
