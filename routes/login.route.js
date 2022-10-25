const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/login.controller"); //추상화 되어있는상태
const loginController = new LoginController(); 

router.post("/", loginController.loginPost);

module.exports = router;