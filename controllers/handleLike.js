const Post = require("../models/Post");

const handleLike = async (req, res, next) => {
  try {
    const userId = req.id;
    const post = await Post.findById(req.body.post);
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((user) => `${user}` !== userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = handleLike;
