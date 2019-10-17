import mongoose from "mongoose";
import PostModel from "../../models/post.model";

class PostDao {
  static async getAllPosts() {
    try {
      const posts = await PostModel.find().populate("author topic");
      return posts;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = 500;

      throw error;
    }
  }

  static async createPost(postDTO) {
    try {
      const post = new PostModel(postDTO);
      const error = post.validateSync();
      if (error) {
        const httpError = new Error(error.message);
        httpError.code = 400;
        throw httpError;
      }

      await post.save();
      return post;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = 500;

      throw httpError;
    }
  }

  static async getById(postId) {
    try {
      const post = await PostModel.findById(
        mongoose.Types.ObjectId(postId)
      ).populate("topic author");
      if (!post) {
        const httpError = new Error("Post not found");
        httpError.code = 404;

        throw httpError;
      }

      return post;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = 500;

      throw httpError;
    }
  }

  static async postsByTopic(topicId) {
    try {
      const posts = await PostModel.find({
        topic: mongoose.Types.ObjectId(topicId)
      }).populate("author");

      return posts;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = 500;

      throw httpError;
    }
  }

  static async userPosts(userId) {
    try {
      const posts = await PostModel.find({
        author: mongoose.Types.ObjectId(userId)
      }).populate("topic");
      return posts;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = 500;

      throw httpError;
    }
  }
}

export default PostDao;
