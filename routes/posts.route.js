const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth-middleware");

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.post("/", middleware, postsController.createPost);
router.get("/like", middleware, postsController.getLikesPost);
router.get("/", postsController.getPosts);
router.get("/:postId", postsController.getPostById);
router.put("/:postId", middleware, postsController.updatePost);
router.delete("/:postId", middleware, postsController.deletePost);
router.put("/:postId/like", middleware, postsController.putLikesPost);

module.exports = router;
