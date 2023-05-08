const User = require("../models/User");

const handleFriendship = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    const friend = await User.findById(req.body.friend);

    if (user.friends.includes(friend.id)) {
      user.friends = user.friends.filter(
        (person) => `${person._id}` !== `${friend._id}`
      );
      await user.save();
      friend.friends = friend.friends.filter(
        (person) => `${person._id}` !== `${user._id}`
      );
      await friend.save();
    } else {
      user.friendRequests = user.friendRequests.filter(
        (id) => `${id}` !== `${friend._id}`
      );
      user.friends.push(friend.id);
      await user.save();
      friend.friends.push(user.id);
      await friend.save();
    }
    return res.json(friend);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = handleFriendship;
