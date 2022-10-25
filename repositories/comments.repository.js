const { Comments } = require("../models");

class CommentRepository {
  createComment = async (postId, userId, nickname, content) => {
    const createCommentData = await Comments.create({
      postId,
      userId,
      nickname,
      content,
    });
    return createCommentData;
  };

  findPostbyId = async (postId) => {
    const comment = await Comments.findAll({where:{postId}});    
    return comment;
  };

  findCommentbyId = async (commentId) => {
    const findComment = await Comments.findByPk(commentId);
    return findComment;
  };

  updateComment = async (commentId, content) => {
    const updateComment = await Comments.update(
      { content },
      { where: { commentId } }
    );
    return updateComment;
  };

  deleteComment = async (commentId) => {
    const deleteComment = await Comments.destroy({ where: { commentId } });
    return deleteComment;
  };
}

module.exports = CommentRepository;
