const generateToken = require("../utils/generateToken");
const verifyToken = require("../utils/verifyToken");
const { ACCESS_TOKEN_EXP } = require("../data/constants");

const isAuth = async (req, res, next) => {
  try {
    const accessToken = req.get("Authorization").slice(7);
    const [accessTokenError, payload] = await verifyToken(accessToken);
    if (payload) {
      req.id = payload.sub;
      req.name = payload.name;
      return next();
    }
    if (accessTokenError?.message === "jwt expired") {
      const refreshToken = req.cookies["refresh-token"];
      const [refreshTokenError, data] = await verifyToken(refreshToken);
      if (refreshTokenError) throw Error("Refresh token error");
      const user = { id: data.sub, firstName: data.name };
      const [newAccessTokenError, newAccessToken] = await generateToken(
        user,
        ACCESS_TOKEN_EXP
      );
      if (newAccessTokenError) throw Error("Failed to create new access token");
      return res.json({
        token: newAccessToken,
        message:
          "Save NEW access token to local storage and reload protected route",
      });
    } else throw accessTokenError;
  } catch (err) {
    console.log(err.message);
    return res.json({ message: err.message, redirect: "/login" });
  }
};

module.exports = isAuth;
