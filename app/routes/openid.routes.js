const controller = require("../controllers/openid.controller");
const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/auth/checkLogin", controller.CheckLogin);
  app.get("/api/auth/trusona", controller.TrusonaAuthUrl);
  app.get("/api/auth/trusona/callback", controller.TrusonaAuthCallback);
  app.get("/api/auth/logout", controller.TrusonaAuthLogout);

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);

  app.get("/api/auth/getInfoFromEmail", controller.getInfoFromEmail);
};
