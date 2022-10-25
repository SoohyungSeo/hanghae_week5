const { Posts, sequelize, Likes } = require("../models");

class PostRepository {
  constructor(){
    this.Posts = Posts
  }
  findAllpost = async () => {
    const posts = await this.Posts.findAll();
    return posts;
  };

  findPostById = async (postId) => {
    const post = await this.Posts.findByPk(postId);
    return post;
  };

  createPost = async (userId, nickname, title, content) => {
    const createPostData = await this.Posts.create({
      userId,
      nickname,
      title,
      content,
      likes: 0,
    });
    return createPostData;
  };

  updatePost = async (postId, title, content) => {
    const updatePostData = await this.Posts.update(
      { title, content },
      { where: { postId } }
    );
    return updatePostData;
  };

  deletePost = async (postId) => {
    const updatePostData = await this.Posts.destroy({ where: { postId } });
    return updatePostData;
  };

  putLikesPost = async (postId, userId) => {
    const likeuser = await Likes.findOne({ where: { postId, userId } });
    if (likeuser) {
      await Likes.destroy({ where: { postId, userId } });
      await this.Posts.decrement({ likes: 1 }, { where: { postId } });
    } else {
      await Likes.create({ postId, userId });
      await this.Posts.increment({ likes: 1 }, { where: { postId } });
    }
    return;
  };

  findLikesById = async (userId) => {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM Posts JOIN Likes ON Likes.postId = Posts.postId" // Posts 라는 테이블을 Likes에 연결하겠다. Likes.postId와 Posts.postId 는 같게 해준것. orderby 정렬할때 쓰는거참고
    );
    const Likepost = [];
    results.map((like) => {
      like.userId === userId
        ? Likepost.push({
            postId: like.postId,
            userId: like.userId,
            nickname: like.nickname,
            title: like.title,
            createdAt: like.createdAt,
            updatedAt: like.updatedAt,
            likes: like.likes,
          })
        : false;
    });     
    let Likelist = Likepost.sort((a, b) => b.likes - a.likes);
    return Likelist;
  };
}

module.exports = PostRepository;
