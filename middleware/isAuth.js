const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_EXP } = require("../data/constants");

const isAuth = async (req, res, next) => {
  try {
    let tokenExpired = false;

    const accessToken = req.get("Authorization").slice(7);

    const payload = await jwt.verify(
      accessToken,
      process.env.PUBLIC_KEY,
      { algorithm: "RS256" },
      function (err, decoded) {
        if (err?.message === "jwt expired") {
          tokenExpired = true;
          return null;
        }
        if (err) throw err;
        return decoded;
      }
    );

    if (payload) {
      req.id = payload.sub;
      req.name = payload.name;
      return next();
    }
    if (tokenExpired) {
      const refreshToken = req.cookies["refresh-token"];
      const data = await jwt.verify(refreshToken, process.env.PUBLIC_KEY, {
        algorithm: "RS256",
      });
      const user = { id: data.sub, firstName: data.name };
      const newAccessToken = await generateToken(user, ACCESS_TOKEN_EXP);
      return res.json({
        token: newAccessToken,
        message:
          "Save NEW access token to local storage and reload protected route",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.json({ message: err.message, redirect: "/login" });
  }
};

module.exports = isAuth;
