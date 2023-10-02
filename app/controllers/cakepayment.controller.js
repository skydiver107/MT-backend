const db = require("../models");
const cakeCapitalCheckout = require("cake-capital-checkout");
const Cakepayment = db.cakepayment;

// make unique order id
const makeOrderId = (length) => {
  let result = "mtc_";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

exports.createSessionUrl = async (req, res) => {
  const client_domain = `${process.env.CLIENT_HTTPS}${process.env.CLIENT_HOST}${process.env.CLIENT_PORT}`;
  const user_id = req.body.user_id;
  const amount = req.body.amount;
  const tx_type = req.body.tx_type;

  try {
    const sessionUrl = await cakeCapitalCheckout.createSession({
      token: process.env.MERCHANT_TOKEN,
      amount: req.body.amount,
      order_id: req.body.order_id, // your unique order id
      cancel_url: client_domain + "/confirmPurchase",
      // success_url: client_domain + "/success",
      success_url: `${client_domain}/processPurchase?userId=${user_id}&amount=${amount}&name=${tx_type}`,
    });
    res.json({
      success: true,
      message: "Successful cakepayment checkout",
      data: sessionUrl,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
      message: "Error Cakepayment checkout",
    });
  }
};

exports.createOrRetrieveOrderId = async (req, res) => {
  try {
    const email = req.body.email;

    console.log("here id", db.cakepayment);
    const orderIdCount = await Cakepayment.count({
      where: { email: email },
    });
    const lastOrderId = await Cakepayment.findOne({
      where: { email: email },
      order: [["createdAt", "DESC"]],
    });

    if (lastOrderId) {
      return res.status(200).send({
        message: "You have already registered orderid",
        success: true,
        data: lastOrderId,
      });
    }

    if (orderIdCount > 0)
      return res.status(500).send({
        success: false,
        message: "This order id has already registered.",
      });

    const orderId = makeOrderId(12); //create an order id

    const newOrderId = await Cakepayment.create({
      email: email,
      orderId: orderId,
    });

    if (newOrderId)
      return res.status(200).send({
        message: "New order id is successfully added.",
        success: true,
        data: newOrderId,
      });
    else
      return res.status(500).send({
        message: "Cannot add an order id.",
        success: false,
      });
  } catch (e) {
    res.json({ error: "Error on Creating a new order id", data: e });
  }
};

exports.addIdentifier = async (req, res) => {
  try {
    //do something
    res.json({ success: true, message: "Successfully added an identifier." });
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on adding identifiers",
      error: e,
    });
  }
};

exports.addBulkIdentifier = async (req, res) => {
  try {
    //do something
    res.json({
      success: true,
      message: "Successfully added bulk identifiers.",
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on adding bulk identifiers",
      error: e,
    });
  }
};

exports.getIdentity = async (req, res) => {
  try {
    //do something
    res.json({
      success: true,
      message: "Successfully get identity info.",
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on getting identifiers",
      error: e,
    });
  }
};

// for disbursement
exports.createEFTDisbursement = async (req, res) => {
  try {
    //do something
    res.json({
      id: "oxtfturgm2-0203-p8pnspgwssi3rmhb8fjvjuoz",
      status: "ACCEPTED",
      referenceId: "refid12342850",
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on creating a EFT disbursement",
      error: e,
    });
  }
};

exports.createACHDisbursement = async (req, res) => {
  try {
    //do something
    res.json({
      id: "oxtfturgm2-0203-p8pnspgwssi3rmhb8fjvjuoz",
      status: "ACCEPTED",
      referenceId: "refid12342850",
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on creating a ACH disbursement",
      error: e,
    });
  }
};

exports.createBulkEFTDisbursement = async (req, res) => {
  try {
    //do something
    res.json({
      id: "oxtfturgm2-0203-p8pnspgwssi3rmhb8fjvjuoz",
      status: "ACCEPTED",
      referenceId: "refid12342850",
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on creating a bulk EFT disbursement",
      error: e,
    });
  }
};

exports.createBulkACHDisbursement = async (req, res) => {
  try {
    //do something
    res.json({
      id: "oxtfturgm2-0203-p8pnspgwssi3rmhb8fjvjuoz",
      status: "ACCEPTED",
      referenceId: "refid12342850",
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Failed on creating a bulk ACH disbursement",
      error: e,
    });
  }
};
