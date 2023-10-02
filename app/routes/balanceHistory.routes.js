const { authJwt } = require("../middleware");
const controller = require("../controllers/balanceHistory.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/balanceHistory", controller.getBalanceHistory);

  app.post("/api/balanceHistory", controller.createBalanceHistory);

  app.put("/api/balanceHistory/:id", controller.updateBalanceHistory);

  app.delete("/api/balanceHistory/:id", controller.deleteBalanceHistory);

  app.post("/api/balanceTransfer", controller.balanceTransfer);

  app.post("/api/getAllBalanceHistory", controller.getAllBalanceHistory);

  app.post("/api/getPlaidBalanceHistory", controller.getPlaidBalanceHistory);

  app.post("/api/getBankAccountbyItemId", controller.getBankAccountbyItemId);

  app.post("/api/getBankAccountByUserId", controller.getBankAccountByUserId);
};
