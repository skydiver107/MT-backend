const { Issuer } = require("openid-client");

/*

Initialice two main things: the OpenId issuer and client,
these will be necessary for session management as
well as for authentication.

This is a direct dependency of the rest of the auth middlewares.


 */
initialize = async (req, res, next) => {
  if (req.app.authIssuer) {
    return next();
  }
  const trusonaDiscovery = await Issuer.discover(
    process.env.COGNITO_DISCOVERY_ENDPOINT
  );

  const client = new trusonaDiscovery.Client({
    client_id: process.env.APP_AUTH_CODE_CLIENT_ID,
    client_secret: process.env.APP_AUTH_CODE_CLIENT_SECRET,
    redirect_uris: [process.env.APP_AUTH_CODE_CALLBACK],
    response_types: [process.env.APP_AUTH_CODE_GRANT_TYPE],
  });

  req.app.authIssuer = trusonaDiscovery;
  req.app.authClient = client;

  next();
};

const openidAuth = {
  initialize,
};

module.exports = openidAuth;
