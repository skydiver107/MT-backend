require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const { openidAuth } = require("./app/middleware");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "NBBL-session",
    keys: ["nbbl-session-key1", "nbbl-session-key2"], // should use as secret environment variable
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  })
);
app.use(openidAuth.initialize);

// database
const db = require("./app/models");

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Moneto Server." });
});

// routes
require("./app/routes/openid.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/transaction.routes")(app);
require("./app/routes/balanceHistory.routes")(app);
require("./app/routes/stripe.routes")(app);
require("./app/routes/plaid.routes")(app);
require("./app/routes/notification.routes")(app);
require("./app/routes/cakepayment.routes")(app);
require("./app/routes/paylux.routes")(app);

// set port, listen for requests
const PORT = process.env.DB_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
