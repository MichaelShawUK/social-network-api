const jwt = require("jsonwebtoken");

const generateToken = async (user, expiresIn) => {
  try {
    const payload = {
      sub: user.id,
      name: user.firstName,
    };
    // change algorith to rs256 when using ssh keys
    const token = await jwt.sign(payload, "secret", { expiresIn });

    return [null, token];
  } catch (err) {
    return [err, null];
  }
};

module.exports = generateToken;
