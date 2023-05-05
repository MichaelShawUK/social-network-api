const jwt = require("jsonwebtoken");

const verifyToken = async (token) => {
  try {
    const payload = await jwt.verify(token, "secret");
    return [null, payload];
  } catch (err) {
    return [err, null];
  }
};

module.exports = verifyToken;
