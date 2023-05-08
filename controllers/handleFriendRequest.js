const User = require("../models/User");

const handleFriendRequest = async (req, res, next) => {
  try {
    const receiver = await User.findById(req.body.receiver);
    if (receiver.friendRequests.includes(req.id)) return res.json(receiver);
    receiver.friendRequests.push(req.id);
    await receiver.save();
    return res.json(receiver);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = handleFriendRequest;
