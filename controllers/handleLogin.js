const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

    return res.redirect("/");
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = handleLogin;
