const PostRepository = require("../repositories/posts.repository");
const crypto = require("crypto");

class postService {
  postRepository = new PostRepository();

  findAllpost = async () => {
    const allPost = await this.postRepository.findAllpost();
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    if(!allPost) throw {message:"찾는 게시물이 없습니다."}
    return allPost.map((post) => {
      return {
        postId: post.postId,
        userId: post.userId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.likes,
      };
    });
  }
  
  findPostById = async (postId) => {
    
    const findPost = await this.postRepository.findPostById(postId);
    if(!findPost) {
      throw { message: "찾는 게시물이 없습니다."}
    }
    return {
      postId: findPost.postId,
      userId: findPost.userId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
      likes: findPost.likes,
    } 
  }

  createPost = async (userId, nickname, title, content) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      nickname,
      title,
      content
    );
    return {
      postId: createPostData.null,
      userId: createPostData.userId,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
      likes: createPostData.likes,
    };
  };

  updatePost = async (postId, title, content) => {
    const findPost = await this.postRepository.findPostById(postId);
    if(!findPost) {
      throw { message: "찾는 게시물이 없습니다."}
    }

    await this.postRepository.updatePost(postId, title, content);
    const updatePost = await this.postRepository.findPostById(postId);

    return {
      postId: updatePost.postId,
      userId: updatePost.userId,
      nickname: updatePost.nickname,
      title: updatePost.title,
      content: updatePost.content,
      createdAt: updatePost.createdAt,
      updatedAt: updatePost.updatedAt,
      likes: updatePost.likes,
    };
  };

  deletePost = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);
    if(!findPost) {
      throw { message: "찾는 게시물이 없습니다."}
    }

    await this.postRepository.deletePost(postId);

    return {
      postId: findPost.postId,
      userId: findPost.userId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
      likes: findPost.likes,
    };
  };

  putLikesPost = async (postId, userId) => {
    await this.postRepository.putLikesPost(postId,userId);
    const updatePost = await this.postRepository.findPostById(postId);
    return {
      postId: updatePost.postId,
      userId: updatePost.userId,
      nickname: updatePost.nickname,
      title: updatePost.title,
      content: updatePost.content,
      createdAt: updatePost.createdAt,
      updatedAt: updatePost.updatedAt,
      likes: updatePost.likes,
    };
  };

  LikepostGet = async (userId) => {
    const findLikePost = await this.postRepository.findLikesById(userId);
    return findLikePost;
  };
}

module.exports = postService;
