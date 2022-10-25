const { post } = require("../routes");
const PostService = require("../services/posts.service");
const crypto = require("crypto");
const { sequelize } = require("../models");
const { resolveSoa } = require("dns");

class PostsController {
  postService = new PostService();

  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const { userId } = res.locals.user;
    const { nickname } = res.locals.user;
    const createPostData = await this.postService.createPost(
      userId,
      nickname,
      title,
      content
    );
    res.status(201).json({ data: createPostData });
  };

  getPosts = async (req, res, next) => {
    try{
    const posts = await this.postService.findAllpost();
    
    res.status(200).json({ data: posts });
    }catch(e){
      res.status(400).json({message: e.message})
    }
  };

  getPostById = async (req, res, next) => {
    try{
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    res.status(200).json({ data: post });
    }catch(e){
      res.status(400).json({message:e.message})
    }
  };

  updatePost = async (req, res, next) => {
    try{
    const { postId } = req.params;
    const { title, content } = req.body;

    const updatePost = await this.postService.updatePost(
      postId,
      title,
      content
    );

    res.status(200).json({ data: updatePost });
    }catch(e){
      res.status(400).json({message: e.message})
    }
  };

  deletePost = async (req, res, next) => {
    try{
    const { postId } = req.params;
    const deletePost = await this.postService.deletePost(postId);

    res.status(200).json({ data: deletePost });
    }catch(e){
      res.status(400).json({message: e.message})
    }
  };

  putLikesPost = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const updatePost = await this.postService.putLikesPost(postId, userId);
    res.status(200).json({ data: updatePost });
  };

  getLikesPost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const LikePostGet = await this.postService.LikepostGet(userId);
    res.status(200).json({ data: LikePostGet });
  };
}
module.exports = PostsController;
