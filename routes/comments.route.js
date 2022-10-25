const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth-middleware");

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();

router.post("/:postId",middleware, commentsController.createComment);
router.get("/:postId", commentsController.getCommentsById);
router.put("/:commentId",middleware, commentsController.updateComment);
router.delete("/:commentId",middleware, commentsController.deleteComment)

module.exports = router;
