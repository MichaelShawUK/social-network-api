const Comment = require("../models/Comment");
const Post = require("../models/Post");

const handleComment = async (req, res, next) => {
  try {
    const post = req.body.post;
    const text = req.body.text?.trim();
    if (!text) throw Error("Comment is required");
    const comment = new Comment({
      text,
      author: req.id,
      post,
    });
    const doc = await comment.save();

    const commentedPost = await Post.findById(post);
    commentedPost.hasComment = true;
    await commentedPost.save();

    return res.json({ comment: doc });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = handleComment;
