var express = require("express");
var router = express.Router();
const handleRegister = require("../controllers/handleRegister");
const handleLogin = require("../controllers/handleLogin");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ message: "OdinBook API" });
});

router.post("/register", handleRegister, handleLogin);
router.post("/login", handleLogin);

module.exports = router;
