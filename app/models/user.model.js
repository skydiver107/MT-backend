module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    mtcAmount: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
    city: {
      type: Sequelize.STRING,
    },
    accountType: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    userAvatar: {
      type: Sequelize.STRING,
    },
    fullName: {
      type: Sequelize.STRING,
    },
    contactNumber: {
      type: Sequelize.STRING,
    },
    zipCode: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    usCitizen: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    gender: {
      type: Sequelize.STRING,
      defaultValue: "m",
    },
    birthDate: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
