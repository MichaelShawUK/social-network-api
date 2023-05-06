const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (token) => {
  try {
    const payload = await jwt.verify(token, process.env.PUBLIC_KEY, {
      algorithm: "RS256",
    });
    return [null, payload];
  } catch (err) {
    return [err, null];
  }
};

module.exports = verifyToken;
