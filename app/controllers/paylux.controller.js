const db = require("../models");
const User = db.user;

exports.getToken = async (req, res) => {
  try {
    //do something
    clientId = process.env.Client_ID;
    clientSecret = process.env.CLIENT_SECRET;

    res.json({ success: true, message: "Successfully get a paylux token." });
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on getting a paylux token",
      error: e,
    });
  }
};

exports.createNewPayment = async (req, res) => {
  try {
    //do something
    clientId = process.env.Client_ID;
    clientSecret = process.env.CLIENT_SECRET;

    res.json({ success: true, message: "Successfully created a new payment" });
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on creating a new payment",
      error: e,
    });
  }
};

exports.createCustomerBalanceTransfer = async (req, res) => {
  try {
    //do something
    clientId = process.env.Client_ID;
    clientSecret = process.env.CLIENT_SECRET;

    res.json({
      success: true,
      message: "Successfully created a new balance transfer",
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on creating a balance transfer",
      error: e,
    });
  }
};

exports.customerWithdraw = async (req, res) => {
  try {
    //do something
    clientId = process.env.Client_ID;
    clientSecret = process.env.CLIENT_SECRET;

    res.json({
      success: true,
      message: "Successfully withdrawed",
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on withdrawing",
      error: e,
    });
  }
};
