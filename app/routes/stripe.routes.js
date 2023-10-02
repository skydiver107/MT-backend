const controller = require("../controllers/stripe.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/addStripeCard", controller.addStripeCard);

  app.get("/api/getCardsByUser", controller.getCards);

  // Stripe apis
  app.post("/api/v1/payment_intents", controller.paymentIntents);
  app.get("/api/v1/payment_intents/:id", controller.getPaymentIntentsById);

  app.post("/api/v1/customers", controller.createOrUpdateCustomers);
  app.get("/api/v1/customers/:id", controller.getCustomersById);
  app.post("/api/v1/customers/:id", controller.updateCustomersById);
  app.post("/api/v1/setup_intents", controller.createSetupIntents);
  app.post("/api/v1/setup_intents/:id/confirm", controller.confirmIntentsById);
  app.get("/api/v1/setup_intents/:id", controller.getIntentsById);
};
