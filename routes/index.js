const express = require("express");
const signup = require("./signup.route.js");
const login = require("./login.route.js");
const posts = require("./posts.route.js");
const comments = require("./comments.route.js");
const router = express.Router();


router.use("/posts", posts); //게시글
router.use("/comments", comments); //댓글
router.use("/signup", signup); //회원가입
router.use("/login", login);  //로그인

module.exports = router


