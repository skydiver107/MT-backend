const { authJwt } = require("../middleware");
const controller = require("../controllers/transaction.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/transactions", controller.getTransactions);

  app.post("/api/transaction", controller.createTransaction);
  
  app.put("/api/transaction/:id", controller.updateTransaction);
  
  app.delete("/api/transaction/:id", controller.deleteTransaction);

  app.post("/api/transfer", controller.transfer);
};
