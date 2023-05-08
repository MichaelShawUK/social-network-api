const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (user, expiresIn) => {
  const payload = {
    sub: user.id,
    name: user.firstName,
  };
  const token = await jwt.sign(payload, process.env.PRIVATE_KEY, {
    expiresIn,
    algorithm: "RS256",
  });

  return token;
};

module.exports = generateToken;
