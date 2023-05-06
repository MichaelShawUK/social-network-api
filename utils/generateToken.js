const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (user, expiresIn) => {
  try {
    const payload = {
      sub: user.id,
      name: user.firstName,
    };
    const token = await jwt.sign(payload, process.env.PRIVATE_KEY, {
      expiresIn,
      algorithm: "RS256",
    });

    return [null, token];
  } catch (err) {
    return [err, null];
  }
};

module.exports = generateToken;
