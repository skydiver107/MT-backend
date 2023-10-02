const controller = require("../controllers/paylux.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //   rest api routes for Paylux
  app.post("/api/identity/connect/token", controller.getToken);
  app.post("/api/external/api/v1/PayLux", controller.createNewPayment);
  app.post(
    "/api/external/api/v1/PayLux/CustomerBalanceTransfer",
    controller.createCustomerBalanceTransfer
  );
  app.post(
    "/api/external/api/v1/PayLux/CustomerWithdraw",
    controller.customerWithdraw
  );
};
