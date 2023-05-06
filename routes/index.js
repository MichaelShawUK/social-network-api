var express = require("express");
var router = express.Router();
const handleRegister = require("../controllers/handleRegister");
const handleLogin = require("../controllers/handleLogin");
const getTimeline = require("../controllers/getTimeline");
const isAuth = require("../middleware/isAuth");

/* GET home page. */
router.get("/", isAuth, getTimeline);

router.post("/register", handleRegister, handleLogin);
router.post("/login", handleLogin);

router.get("/protected", isAuth, function (req, res, next) {
  return res.send(`id: ${res.id} -- name: ${res.name}`);
});

module.exports = router;
