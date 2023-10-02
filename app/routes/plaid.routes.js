const controller = require("../controllers/plaid.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/plaid/create_link_token", controller.createLinkToken);

  app.post("/api/plaid/exchange_public_token", controller.exchangePublicToken);

  app.post("/api/plaid/get_balance", controller.getBalance);

  app.post("/api/plaid/make_payment", controller.makePayment);

  app.post("/api/plaid/get_bank_accounts", controller.getBankAccounts);

  app.post("/api/plaid/auth/get", controller.getAuthData);

  app.post("/api/plaid/identity/get", controller.getIdentity);

  app.post(
    "/api/plaid/processor/stripe/bank_account_token/create",
    controller.createProcessorToken
  );

  app.post("/api/plaid/transactions/get", controller.getTransactionData);

  // routes of plaid table for users
  app.post("/api/plaid/addAccount", controller.addAccount);

  app.post("/api/plaid/accounts", controller.getAccounts);

  app.delete("/api/plaid/deleteAccount/:id", controller.deleteAccount);

  app.post("/api/plaid/transactions", controller.getTransactions);
};
