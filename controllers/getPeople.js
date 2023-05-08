const User = require("../models/User");

const getPeople = async (req, res, next) => {
  try {
    const user = await User.findById(req.id)
      .select({ password: 0 })
      .populate("friends", "firstName lastName avatar");

    const userIds = [user._id, ...user.friends.map((friend) => friend._id)];

    const strangers = await User.find()
      .where("_id")
      .nin(userIds)
      .select("firstName lastName avatar");

    return res.json({ user, strangers });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = getPeople;
