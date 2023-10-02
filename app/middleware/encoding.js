exports.fromBase64 = (value) => {
  return JSON.parse(Buffer.from(value, "base64").toString("utf8"));
};

exports.toBase64 = (data) => {
  return Buffer.from(JSON.stringify(data)).toString("base64");
};
