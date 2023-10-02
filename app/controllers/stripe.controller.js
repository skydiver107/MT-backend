require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../models");
const StripeCard = db.stripeCard;

exports.addStripeCard = async (req, res) => {
  const customerId = req.body.customerId;
  const id = req.body.id;
  const cardNumber = req.body.cardNumber;
  const cardName = req.body.cardName;
  const expiryMonth = req.body.expiryMonth;
  const expiryYear = req.body.expiryYear;
  const cvv = req.body.cvv;

  if (
    cardNumber == undefined ||
    cardNumber == null ||
    cardNumber == "" ||
    cardName == undefined ||
    cardName == null ||
    cardName == "" ||
    cvv == undefined ||
    cvv == null ||
    cvv == ""
  ) {
    return res.status(500).send({
      success: false,
      message: "Please provide correct card information.",
    });
  }
  try {
    const card = await stripe.customers.createSource(customerId, {
      source: {
        object: "card",
        number: cardNumber,
        exp_month: expiryMonth,
        exp_year: expiryYear,
        cvc: cvv,
        name: cardName,
      },
    });

    if (card)
      return res.status(200).send({
        message: "New Card is successfully added.",
        success: true,
        data: card,
      });
    else
      return res.status(500).send({
        message: "Cannot add a card.",
        success: false,
      });
  } catch (e) {
    return res.status(200).send({
      message: "Cannot add a card. Your card infomation is invalid",
      success: false,
    });
  }
};

exports.getCards = async (req, res) => {
  customerId = req.query.customerId;
  try {
    const cards = await stripe.customers.listSources(customerId, {
      object: "card",
      limit: 3,
    });
    // const cards = await StripeCard.findAll({ where: { userId: id } });
    if (cards)
      return res.status(200).send({
        data: cards,
        message: "Successfully imported cards",
        success: true,
      });
    else
      return res.status(500).send({
        message: "Cannot get a card.",
        success: false,
      });
  } catch (e) {
    return res.status(500).send({
      message: "Error on Getting Stripe Cards",
      success: false,
    });
  }
};

//standard stripe REST apis

exports.paymentIntents = async (req, res) => {
  try {
    const { product, user } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price,
      currency: "usd",
      customer: user.customerId,
      payment_method: user.cardId,
      confirm: true,
    });
    res.json({
      paymentIntent: paymentIntent,
      success_url:
        `processPurchase?userId=` +
        user.userId +
        "&amount=" +
        product.price +
        "&name=" +
        product.name,
      cancel_url: `cancel`,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Failed on stripe payment",
      success: false,
      data: e,
    });
  }
};

exports.getPaymentIntentsById = async (req, res) => {
  const id = req.params.id;
  const paymentIntent = await stripe.paymentIntents.retrieve(id);
  res.json(paymentIntent);
};

exports.createOrUpdateCustomers = async (req, res) => {
  try {
    const email = req.body.email;

    const customerCount = await StripeCard.count({
      where: { email: email },
    });
    const lastCustomer = await StripeCard.findOne({
      where: { email: email },
      order: [["createdAt", "DESC"]],
    });

    // try {
    //   const customers = await stripe.customers.list({
    //     limit: 1,
    //     email: email,
    //   });
    //   console.log("tempCustomers,", customers);
    //   return res.json(customers);
    // } catch (e) {
    //   return res.json(e);
    // }

    if (lastCustomer) {
      return res.status(200).send({
        message: "You have already registered customer",
        success: true,
        data: lastCustomer,
      });
    }

    if (customerCount > 0)
      return res.status(500).send({
        success: false,
        message: "This customer has already registered.",
      });

    const customer = await stripe.customers.create({
      email: email,
    });

    const newCustomer = await StripeCard.create({
      email: email,
      customerId: customer.id,
    });

    if (newCustomer)
      return res.status(200).send({
        message: "New Customer is successfully added.",
        success: true,
        data: customer,
      });
    else
      return res.status(500).send({
        message: "Cannot add a Customer.",
        success: false,
      });
  } catch (e) {
    res.json({ error: "Error on Creating a new customer" });
  }
};

exports.getCustomersById = async (req, res) => {
  const id = req.params.id;
  const customer = await stripe.customers.retrieve(id);
  res.json(customer);
};

exports.updateCustomersById = async (req, res) => {
  const id = req.params.id;
  const customer = await stripe.customers.update(id);
  res.json(customer);
};

exports.createSetupIntents = async (req, res) => {
  const setupIntent = await stripe.setupIntents.create({
    automatic_payment_methods: { enabled: true },
  });
  res.json(setupIntent);
};

exports.confirmIntentsById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id is", id);
    const setupIntent = await stripe.setupIntents.confirm(id);
    res.json(setupIntent);
  } catch (e) {
    res.json(e);
  }
};

exports.getIntentsById = async (req, res) => {
  const id = req.params.id;
  const setupIntent = await stripe.setupIntents.retrieve(id);
  res.json(setupIntent);
};
