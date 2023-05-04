const bcrypt = require("bcryptjs");

const User = require("../models/User");

const handleRegister = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await user.save();

    req.body = {
      username,
      password,
    };

    next();
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = handleRegister;
