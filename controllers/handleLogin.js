const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP } = require("../data/constants");

const handleLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ message: "Incorrect password" });
    }

    const accessToken = await generateToken(user, ACCESS_TOKEN_EXP);

    const refreshToken = await generateToken(user, REFRESH_TOKEN_EXP);

    res.cookie("refresh-token", refreshToken, { httpOnly: true });

    console.log(ACCESS_TOKEN_EXP);
    console.log(REFRESH_TOKEN_EXP);

    console.log(accessToken);
    console.log(refreshToken);

    return res.json({
      token: accessToken,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user?.avatar,
      userId: user._id,
      message: "Save access token to local storage and redirect to / via React",
    });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = handleLogin;
