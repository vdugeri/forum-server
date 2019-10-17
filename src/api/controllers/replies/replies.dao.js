import mongoose from "mongoose";
import ReplyModel from "./reply.model";

class ReplyDao {
  static async createReply(replyDTO) {
    try {
      const reply = new ReplyModel(replyDTO);
      const error = reply.validateSync();
      if (error) {
        const httpError = new Error(error.message);
        httpError.code = 400;

        throw httpError;
      }

      await reply.save();
      return reply;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = error.code || 500;

      throw httpError;
    }
  }

  static async repliesForPost(postId) {
    try {
      const replies = await ReplyModel.find({
        post: mongoose.Types.ObjectId(id)
      }).populate("author");

      return replies;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = 500;

      throw httpError;
    }
  }
}

export default ReplyDao;
