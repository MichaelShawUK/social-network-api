const Comment = require("../models/Comment");

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.body.postId }).populate(
      "author",
      "firstName lastName"
    );

    return res.json({ comments });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = getComments;
