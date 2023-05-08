const User = require("../models/User");
const getPosts = require("../utils/getPosts");

const getTimeline = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.id,
      "firstName lastName avatar friends friendRequests"
    ).populate("friends", "firstName lastName avatar");

    const userIds = [user._id, ...user.friends.map((friend) => friend._id)];

    const allPosts = Promise.all(userIds.map(async (id) => await getPosts(id)));

    const sortedPosts = (await allPosts)
      .flat()
      .sort((a, b) => b.createdAt - a.createdAt);

    return res.json({
      user,
      posts: sortedPosts,
    });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = getTimeline;
