var express = require("express");
var router = express.Router();
const handleRegister = require("../controllers/handleRegister");
const handleLogin = require("../controllers/handleLogin");
const isAuth = require("../middleware/isAuth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ message: "OdinBook API" });
});

router.post("/register", handleRegister, handleLogin);
router.post("/login", handleLogin);

router.get("/protected", isAuth, function (req, res, next) {
  return res.send(`id: ${res.id} -- name: ${res.name}`);
});

module.exports = router;
