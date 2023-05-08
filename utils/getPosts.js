const Post = require("../models/Post");

async function getPosts(user) {
  const posts = await Post.find({ author: user }).populate(
    "author",
    "firstName lastName avatar"
  );
  return posts;
}

module.exports = getPosts;
