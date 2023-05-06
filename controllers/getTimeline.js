const User = require("../models/User");
const Post = require("../models/Post");

async function getPosts(user) {
  try {
    const posts = await Post.find({ author: user }).populate(
      "author",
      "firstName lastName avatar"
    );
    return posts;
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}

const getTimeline = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.id,
      "firstName lastName avatar friends friendRequests"
    ).populate("friends", "firstName lastName avatar");

    const userIds = [user._id, ...user.friends.map((friend) => friend._id)];

    const allPosts = Promise.all(userIds.map(async (id) => await getPosts(id)));
    console.log(
      (await allPosts).flat().sort((a, b) => b.createdAt - a.createdAt)
    );

    res.send(user);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

module.exports = getTimeline;
