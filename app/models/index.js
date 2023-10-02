const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  dialectOptions: config.dialectOptions,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.address = require("../models/address.model.js")(sequelize, Sequelize);
db.shippingAddress = require("../models/shippingAddress.model.js")(
  sequelize,
  Sequelize
);

db.accessToken = require("../models/accessToken.model.js")(
  sequelize,
  Sequelize
);
db.transaction = require("../models/transaction.model.js")(
  sequelize,
  Sequelize
);
db.balanceHistory = require("../models/balanceHistory.model.js")(
  sequelize,
  Sequelize
);

db.stripeCard = require("../models/stripeCard.model.js")(sequelize, Sequelize);
db.plaid = require("../models/plaid.model.js")(sequelize, Sequelize);
db.cakepayment = require("../models/cakepayment.model.js")(
  sequelize,
  Sequelize
);

db.notification = require("../models/notification.model.js")(
  sequelize,
  Sequelize
);

db.role.belongsToMany(db.user, {
  through: "userRoles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "userRoles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "admin"];

module.exports = db;
