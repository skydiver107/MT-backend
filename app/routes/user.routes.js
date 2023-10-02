const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/users", controller.getUsers);

  app.post("/api/user", controller.addUser);

  app.put("/api/user/:id", controller.updateUser);

  app.delete("/api/user/:id", controller.deleteUser);
};
