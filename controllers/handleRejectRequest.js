const User = require("../models/User");

const handleRejectRequest = async (req, res, next) => {
  try {
    const sender = req.body.sender;
    const user = await User.findById(req.id);
    user.friendRequests = user.friendRequests.filter(
      (id) => `${id}` !== sender
    );
    await user.save();
    return res.json(user);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = handleRejectRequest;
