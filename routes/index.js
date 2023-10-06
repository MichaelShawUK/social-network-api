var express = require("express");
var router = express.Router();
const handleRegister = require("../controllers/handleRegister");
const handleLogin = require("../controllers/handleLogin");
const handlePost = require("../controllers/handlePost");
const handleProfileEdit = require("../controllers/handleProfileEdit");
const handleLike = require("../controllers/handleLike");
const handleComment = require("../controllers/handleComment");
const getTimeline = require("../controllers/getTimeline");
const getProfile = require("../controllers/getProfile");
const getPeople = require("../controllers/getPeople");
const getComments = require("../controllers/getComments");
const handleFriendRequest = require("../controllers/handleFriendRequest");
const handleRejectRequest = require("../controllers/handleRejectRequest");
const handleFriendship = require("../controllers/handleFriendship");
const isAuth = require("../middleware/isAuth");

router.post("/register", handleRegister, handleLogin);
router.post("/login", handleLogin);

router.get("/", isAuth, getTimeline);
router.get("/profile/:userId", isAuth, getProfile);
router.get("/people", isAuth, getPeople);

router.post("/comments", isAuth, getComments);
router.post("/edit", isAuth, handleProfileEdit);
router.post("/post", isAuth, handlePost);
router.post("/like", isAuth, handleLike);
router.post("/comment", isAuth, handleComment);
router.post("/befriend", isAuth, handleFriendRequest);
router.post("/reject", isAuth, handleRejectRequest);
router.post("/friendship", isAuth, handleFriendship);

router.get("/protected", isAuth, function (req, res, next) {
  return res.send(`id: ${res.id} -- name: ${res.name}`);
});

import User from "../models/User";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json({ users });
  } catch (err) {
    return res.json(err);
  }
};

router.get("/test", getUsers);

module.exports = router;
