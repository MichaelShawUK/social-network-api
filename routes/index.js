var express = require("express");
var router = express.Router();
const handleRegister = require("../controllers/handleRegister");
const handleLogin = require("../controllers/handleLogin");
const handlePost = require("../controllers/handlePost");
const handleLike = require("../controllers/handleLike");
const handleComment = require("../controllers/handleComment");
const getTimeline = require("../controllers/getTimeline");
const getProfile = require("../controllers/getProfile");
const getPeople = require("../controllers/getPeople");
const handleFriendRequest = require("../controllers/handleFriendRequest");
const isAuth = require("../middleware/isAuth");

router.post("/register", handleRegister, handleLogin);
router.post("/login", handleLogin);

router.get("/", isAuth, getTimeline);
router.get("/profile", isAuth, getProfile);
router.get("/people", isAuth, getPeople);

router.post("/post", isAuth, handlePost);
router.post("/like", isAuth, handleLike);
router.post("/comment", isAuth, handleComment);
router.post("/befriend", isAuth, handleFriendRequest);

router.get("/protected", isAuth, function (req, res, next) {
  return res.send(`id: ${res.id} -- name: ${res.name}`);
});

module.exports = router;
