const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

  createComment = async (postId, userId, nickname, content) => {
    const createCommentData = await this.commentRepository.createComment(
      postId,
      userId,
      nickname,
      content
    );
    return {
      commentsId: createCommentData.null,
      postId: createCommentData.postId,
      userId: createCommentData.userId,
      nickname: createCommentData.nickname,
      content: createCommentData.content,
      createdAt: createCommentData.createdAt,
      updatedAt: createCommentData.updatedAt,
    };
  };

  findPostbyId = async (postId) => {
    const comment = await this.commentRepository.findPostbyId(postId);
    
        return comment
  };

  updateComment = async (commentId, content) => {
    const findComment = await this.commentRepository.findCommentbyId(commentId);
    if (!findComment) throw {message:"해당 댓글이 없습니다."};

    await this.commentRepository.updateComment(commentId, content);
    const updateComment = await this.commentRepository.findCommentbyId(
      commentId
    );
    return {
      commentId: updateComment.commentId,
      postId: updateComment.postId,
      userId: updateComment.userId,
      nickname: updateComment.nickname,
      content: updateComment.content,
      createdAt: updateComment.createdAt,
      updatedAt: updateComment.updatedAt,
    };
  };

  deleteComment = async (commentId) => {
    const findComment = await this.commentRepository.findCommentbyId(commentId);
    await this.commentRepository.deleteComment(commentId);
    if (!findComment) throw {message:"해당 댓글이 없습니다."}

    return {
      commentId: findComment.commentId,
      postId: findComment.postId,
      userId: findComment.userId,
      nickname: findComment.nickname,
      content: findComment.content,
      createdAt: findComment.createdAt,
      updatedAt: findComment.updatedAt,
    };
  };
}

module.exports = CommentService;
