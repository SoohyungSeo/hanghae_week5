const CommentService = require("../services/comments.service");

class CommentsController {
  commentsService = new CommentService();

  createComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { content } = req.body;
      const { userId } = res.locals.user;
      const { nickname } = res.locals.user;
      if (content === "") throw { message: "댓글 내용을 입력해주세요." };
      const createCommentData = await this.commentsService.createComment(
        postId,
        userId,
        nickname,
        content
      );
      res.status(201).json({ data: createCommentData });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  };
  
  getCommentsById = async (req, res, next) => {
    try {
      const { postId } = req.params;
      if (!postId) throw { message: "찾는 게시물이 없습니다." };
      const comment = await this.commentsService.findPostbyId(postId);
      res.status(200).json({ data: comment });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  };

  updateComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      if (content === "") throw { message: "댓글 내용을 입력해주세요" };

      const updateComment = await this.commentsService.updateComment(
        commentId,
        content
      );
      res.status(200).json({ data: updateComment });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const deleteComment = await this.commentsService.deleteComment(commentId);

      res.status(200).json({ data: deleteComment });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  };
}

module.exports = CommentsController;
