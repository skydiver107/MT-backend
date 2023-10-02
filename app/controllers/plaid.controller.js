require("dotenv").config();

const plaid = require("plaid");
const db = require("../models");
const moment = require("moment");
const PlaidUserModel = db.plaid;
const environment = process.env.PLAID_ENV;

const configuration = new plaid.Configuration({
  basePath: plaid.PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const client = new plaid.PlaidApi(configuration);

exports.createLinkToken = async (req, res) => {
  try {
    const clientUserId = process.env.PLAID_CLIENT_ID;

    const linkTokenResponse = await client.linkTokenCreate({
      user: {
        client_user_id: clientUserId,
      },
      client_name: "Test App",
      products: ["auth", "transactions"],
      country_codes: ["US"],
      language: "en",
    });
    const link_token = linkTokenResponse.data.link_token;

    res.json({ link_token });
  } catch (e) {
    console.log(e);
  }
};

exports.exchangePublicToken = async (req, res) => {
  var public_token = req.body.token;
  try {
    const response = await client.itemPublicTokenExchange({ public_token });
    const access_token = response.data.access_token;

    console.log("access token below");
    console.log(access_token);

    res.send({
      access_token: access_token,
    });
  } catch (e) {
    console.log("Error on ExchangePublicToken");
  }
};

exports.getBalance = async (req, res) => {
  const access_token = req.body.token;
  try {
    const response = await client.accountsBalanceGet({
      access_token: access_token,
    });

    res.send(response.data.accounts[0]);
  } catch (e) {
    console.log(e);
  }
};

exports.makePayment = async (req, res) => {
  const amount = req.body.amount;
  const user_id = req.body.user_id;
  const tx_type = req.body.tx_type;

  try {
    const recipient = await client.paymentInitiationRecipientCreate({
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      name: "MTC",
      iban: "NL06INGB5632579034",
    }); //This is the fake bank account. Should be changed in the future.
    const recipient_id = recipient.data.recipient_id;
    try {
      const payment = await client.paymentInitiationPaymentCreate({
        recipient_id: recipient_id,
        reference: "TestPayment",
        amount: {
          currency: "GBP",
          value: amount,
        },
      });
      const payment_id = payment.data.payment_id;
      const status = payment.data.status;
      console.log("================");
      console.log("status is", status);
      res.send({
        url:
          "processPurchase?userId=" +
          user_id +
          "&amount=" +
          amount +
          "&name=" +
          tx_type,
        success: "Success",
      });
    } catch (e) {
      console.log("error on paymentInitiationPaymentCreate");
    }
  } catch (e) {
    console.log("error on paymentInitiationRecipientCreate");
  }
};

exports.getAuthData = async (req, res) => {
  const request = {
    access_token: req.body.token,
  };
  try {
    const response = await client.authGet(request);
    const accountData = response.data.accounts;
    const numbers = response.data.numbers;
    res.send(response);
  } catch (error) {
    res.send("Failed on GetAuthData function");
  }
};

exports.getIdentity = async (req, res) => {
  const request = {
    access_token: req.body.token,
  };
  try {
    const response = await client.identityGet(request);
    const identities = response.data.accounts.flatMap(
      (account) => account.owners
    );
    res.send(identities);
  } catch (error) {
    res.send("Failed on GetIdentity function");
  }
};

exports.createProcessorToken = async (req, res) => {
  console.log("public token is", req.body.token);
  try {
    // Exchange the public_token from Plaid Link for an access token.
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: req.body.token,
    });
    const accessToken = tokenResponse.data.access_token;
    const accountRequest = {
      access_token: accessToken,
    };
    const accountResponse = await client.accountsGet(accountRequest);
    const account_id = accountResponse.data.accounts[0].account_id;

    // Generate a bank account token
    const request = {
      access_token: accessToken,
      account_id: account_id,
    }; //sandbox mode
    const stripeTokenResponse =
      await client.processorStripeBankAccountTokenCreate(request);

    const bankAccountToken = stripeTokenResponse.data.stripe_bank_account_token;
    res.send(bankAccountToken);
  } catch (error) {
    res.send("Failed on CreateProcessorToken function");
  }
};

exports.getBankAccounts = async (req, res) => {
  const { access_token } = req.body;
  // const token = JSON.stringify(access_token);
  console.log("access token is", access_token);

  const requestAccount = {
    access_token: access_token,
  };

  try {
    const responseAccount = await client.accountsGet(requestAccount);
    const accounts = responseAccount.data.accounts;

    const responseBanks = await client.itemGet(requestAccount);
    const item = responseBanks.data.item;

    const institution_id = item.institution_id;
    const requestBank = {
      institution_id: institution_id,
      country_codes: ["US"],
    };

    const responseBank = await client.institutionsGetById(requestBank);
    const institutions = responseBank.data.institutions;

    res.json({
      accounts: accounts,
      institutions: responseBank.data.institution,
    });
  } catch (error) {
    // console.error("Error fetching account information:", error);
    res.status(500).json({ error: error });
  }
};

exports.getTransactionData = async (req, res) => {
  const request = {
    access_token: req.body.access_token,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    options: {
      count: 5,
    },
  };

  try {
    const response = await client.transactionsGet(request);

    let transactions = response.data.transactions;
    const total_transactions = response.data.total_transactions;

    res.status(200).json({ message: "Success", transactions: transactions });
    // }
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: "Failed on getting transaction data" });
  }
};

exports.addAccount = async (req, res) => {
  public_token = req.body.public_token;
  const userId = req.body.userId;
  const institution = req.body.metadata.institution;
  const account = req.body.metadata.account;
  const accountName = account.name;
  const accountType = account.type;
  const accountSubtype = account.subtype;
  const last4 = account.mask;
  const { name, institution_id } = institution;

  console.log("current request is", req.body);

  if (public_token) {
    client
      .itemPublicTokenExchange({ public_token })
      .then((exchangeResponse) => {
        ACCESS_TOKEN = exchangeResponse.data.access_token;
        ITEM_ID = exchangeResponse.data.item_id;

        // Check if account already exists for specific user
        PlaidUserModel.findOne({
          where: {
            userId: req.body.userId,
            institutionId: institution_id,
          },
        })
          .then((account) => {
            if (account) {
              res.json({
                message: "This account has already registered",
              });
            } else {
              const newAccount = new PlaidUserModel({
                userId: userId,
                accessToken: ACCESS_TOKEN,
                itemId: ITEM_ID,
                institutionId: institution_id,
                institutionName: name,
                accountName: accountName,
                accountType: accountType,
                accountSubtype: accountSubtype,
                last4: last4,
              });
              newAccount.save().then((account) =>
                res.json({
                  account: account,
                  itemId: ITEM_ID,
                  message: "A new plaid user had been added",
                })
              );
            }
          })
          .catch((err) => console.log(err)); // Database Error
      })
      .catch((err) => console.log(err)); // Plaid Error
  }
};

exports.deleteAccount = async (req, res) => {
  PlaidUserModel.findById(req.params.id).then((account) => {
    // Delete account
    account.remove().then(() =>
      res.json({
        success: true,
        message: "Plaid user has successfully removed.",
      })
    );
  });
};

exports.getAccounts = async (req, res) => {
  PlaidUserModel.findAll({ where: { userId: req.body.userId } })
    .then((accounts) => res.json({ accounts: accounts }))
    .catch((err) => console.log(err));
};

exports.getTransactions = async (req, res) => {
  const now = moment();
  const today = now.format("YYYY-MM-DD");
  const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD"); // Change this if you want more transactions

  let transactions = [];
  const accounts = req.body.bankAccounts;
  if (accounts) {
    accounts.forEach(function (account) {
      ACCESS_TOKEN = account.accessToken;
      const institutionName = account.institutionName;
      client
        .transactionsGet({
          access_token: ACCESS_TOKEN,
          start_date: thirtyDaysAgo,
          end_date: today,
          options: {
            include_personal_finance_category: true,
          },
        })
        .then((response) => {
          // console.log("tx response is", response);
          transactions.push({
            accountName: institutionName,
            transactions: response.data.transactions,
          });
          // Don't send back response till all transactions have been added
          if (transactions.length === accounts.length) {
            res.json({ transactions: transactions });
          }
        })
        .catch((err) => console.log(err));
    });
  }
};
