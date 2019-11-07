import mongoose from "mongoose";
import ReplyModel from "api/replies/reply.model";
import PostDao from "api/posts/posts.dao";

class ReplyDao {
  static async createReply(replyDTO) {
    const { post } = replyDTO;
    try {
      const postToUpdate = await PostDao.getById(post);
      if (postToUpdate) {
        const reply = new ReplyModel(replyDTO);
        const error = reply.validateSync();

        if (error) {
          throw error;
        }
        await reply.save();
        postToUpdate.replies.push(reply._id);
        postToUpdate.save();

        const updatedPost = await PostDao.getById(post);

        return updatedPost;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async repliesForPost(postId) {
    try {
      const replies = await ReplyModel.find({
        post: mongoose.Types.ObjectId(postId)
      })
        .sort({ created_at: "desc" })
        .populate("author");

      return replies;
    } catch (error) {
      throw error;
    }
  }

  static async findById(replyId) {
    try {
      const reply = await ReplyModel.findById(replyId).populate("author");
      return reply;
    } catch (error) {
      throw error;
    }
  }
}

export default ReplyDao;
