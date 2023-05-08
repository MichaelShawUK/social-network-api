const User = require("../models/User");
const Post = require("../models/Post");

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.id)
      .select({ password: 0 })
      .populate("friends", "firstName lastName avatar");

    const posts = await Post.find({ author: user.id });

    posts.sort((a, b) => b.createdAt - a.createdAt);

    const profile = { user, posts };
    return res.json(profile);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = getProfile;