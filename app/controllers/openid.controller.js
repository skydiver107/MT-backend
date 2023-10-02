const db = require("../models");
const User = db.user;
const AccessToken = db.accessToken;
const config = require("../config/auth.config");
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const { serializeAuthState } = require("../middleware/state");

exports.CheckLogin = async (req, res) => {
  try {
    const tokenSet = await AccessToken.findOne({
      where: {
        token: req.query.accessToken,
      },
    });
    const userWithToken = await User.findOne({
      where: {
        id: tokenSet.userId,
      },
    });

    let authorities = [];
    const roles = await userWithToken.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    const expiresAt = tokenSet.expiresAt;
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (expiresAt && currentTime < expiresAt) {
      // Access token is still valid
      return res.status(200).send({
        isAuthenticated: true,
        id: userWithToken.id,
        username: userWithToken.username,
        email: userWithToken.email,
        roles: authorities,
        mtcAmount: userWithToken.mtcAmount,
        userAvatar: userWithToken.userAvatar,
        fullName: userWithToken.fullName,
        contactNumber: userWithToken.contactNumber,
        zipCode: userWithToken.zipCode,
        city: userWithToken.city,
        state: userWithToken.state,
        usCitizen: userWithToken.usCitizen,
        gender: userWithToken.gender,
        birthDate: userWithToken.birthDate,
        address: userWithToken.address,
        createdAt: userWithToken.createdAt,
      });
    } else {
      // Access token expired
      return res.status(200).send({ isAuthenticated: false });
    }
  } catch {
    return res.status(200).send({ isAuthenticated: false });
  }
};

exports.TrusonaAuthUrl = async (req, res) => {
  try {
    const client = req.app.authClient;

    const state = serializeAuthState("state");

    const authUrl = client.authorizationUrl({
      scope: process.env.APP_AUTH_CODE_SCOPES,
      state: state,
    });
    req.session.state = state;

    return res.status(200).send({ authUrl: authUrl });
  } catch (error) {
    console.error(error.message);
    return res.status(400).send(error);
  }
};

exports.TrusonaAuthCallback = async (req, res, next) => {
  try {
    const client = req.app.authClient;
    const state = req.query.state;
    const params = client.callbackParams(req);

    const tokenSet = await client.callback(
      process.env.APP_AUTH_CODE_CALLBACK,
      params,
      { state }
    );

    const accessToken = tokenSet.access_token;
    const expiresAt = tokenSet.expires_at;
    const userInfo = await client.userinfo(accessToken);

    const email = userInfo.sub;
    const emailSubs = email.split("@");
    var username = "";
    if (emailSubs[0]) {
      username = emailSubs[0];
    } else {
      username = email;
    }

    TrusonaSignup(req, res, accessToken, expiresAt, email, username);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const TrusonaSignup = async (
  req,
  res,
  accessToken,
  expiresAt,
  email,
  username
) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      const user = await User.create({
        username: username,
        email: email,
        mtcAmount: 0,
        accountType: 1,
        usCitizen: false,
        gender: "m",
      });

      await AccessToken.create({
        userId: user.id,
        token: accessToken,
        expiresAt: expiresAt,
      });

      if (user.setRoles([1]))
        res.redirect(
          `${process.env.CLIENT_HTTPS}${process.env.CLIENT_HOST}${process.env.CLIENT_PORT}?accessToken=${accessToken}`
        );
      else res.status(400).send({ error: "Not able to create the user." });
    } else {
      await AccessToken.create({
        userId: user.id,
        token: accessToken,
        expiresAt: expiresAt,
      });
      return res.redirect(
        `${process.env.CLIENT_HTTPS}${process.env.CLIENT_HOST}${process.env.CLIENT_PORT}?accessToken=${accessToken}`
      );
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.TrusonaAuthLogout = async (req, res, next) => {
  const client = req.app.authClient;
  try {
    await client.revoke(req.query.accessToken);
    await AccessToken.destroy({
      where: {
        token: req.query.accessToken,
      },
    });
  } catch (error) {
    return res.status(400).send(error);
  }
  res.status(200).send({ message: "Logged out successfully!" });
};

exports.signup = async (req, res) => {
  // Save User to Database
  console.log("signup status");

  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      mtcAmount: 0,
      accountType: 1,
      usCitizen: false,
      gender: "m",
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    req.session.token = token;

    // await AccessToken.create({
    //   userId: user.id,
    //   token: token,
    // });

    return res.status(200).send({
      id: user.id,
      email: user.email,
      roles: ["ROLE_USER"],
      mtcAmount: user.mtcAmount,
      userAvatar: user.userAvatar,
      username: user.username,
      fullName: user.fullName,
      contactNumber: user.contactNumber,
      zipCode: user.zipCode,
      city: user.city,
      state: user.state,
      usCitizen: user.usCitizen,
      gender: user.gender,
      birthDate: user.birthDate,
      address: user.address,
      createdAt: userWithToken.createdAt,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};

exports.getInfoFromEmail = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    req.session.token = token;

    // await AccessToken.create({
    //   userId: user.id,
    //   token: token,
    // });

    return res.status(200).send({
      id: user.id,
      email: user.email,
      roles: ["ROLE_USER"],
      mtcAmount: user.mtcAmount,
      userAvatar: user.userAvatar,
      username: user.username,
      fullName: user.fullName,
      contactNumber: user.contactNumber,
      zipCode: user.zipCode,
      city: user.city,
      usCitizen: user.usCitizen,
      gender: user.gender,
      birthDate: user.birthDate,
      address: user.address,
      createdAt: user.createdAt,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
