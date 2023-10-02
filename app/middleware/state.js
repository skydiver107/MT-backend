const { generators } = require("openid-client");
const { fromBase64, toBase64 } = require("./encoding");

exports.serializeAuthState = (state) => {
  return toBase64({
    ...state,
    bytes: generators.state(),
  });
};

exports.deserializeAuthState = (value) => {
  return fromBase64(value);
};
