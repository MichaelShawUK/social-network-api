const Post = require("../models/Post");

const handlePost = async (req, res, next) => {
  try {
    const text = req.body.text?.trim();
    const image = req.body.image;
    if (!text && !image) throw Error("Post text or image is required");
    const post = new Post({
      text,
      image,
      author: req.id,
    });
    await post.save();
    return res.redirect("/");
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = handlePost;
