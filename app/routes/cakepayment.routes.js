const controller = require("../controllers/cakepayment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //   rest api routes for Cakepayment
  app.post("/api/identities/add", controller.addIdentifier);
  app.post("/api/identities/bulk-add", controller.addBulkIdentifier);
  app.post("/api/identities/:id", controller.getIdentity);

  app.post("/api/eft-debit/create", controller.createEFTDisbursement);
  app.post("/api/ach-debit/create", controller.createACHDisbursement);
  app.post("/api/eft-debit/bulk-create", controller.createBulkEFTDisbursement);
  app.post("/api/ach-debit/bulk-create", controller.createBulkACHDisbursement);

  app.post("/api/cakepayment/createSessionUrl", controller.createSessionUrl);
  app.post("/api/cakepayment/createSessionUrl", controller.createSessionUrl);
  app.post(
    "/api/cakepayment/createOrderId",
    controller.createOrRetrieveOrderId
  );
};
