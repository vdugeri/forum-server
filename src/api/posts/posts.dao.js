import mongoose from "mongoose";
import PostModel from "./post.model";
import ReplyDao from "../replies/replies.dao";

class PostDao {
  static async getAllPosts() {
    try {
      const posts = await PostModel.find().populate(
        "author topic replies replies._author"
      );
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
      const post = await PostModel.findById(postId).populate(
        "topic author replies replies.author"
      );
      if (!post) {
        const httpError = new Error("Post not found");
        httpError.code = 404;

        throw httpError;
      }

      return post;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = error.code || 500;

      throw httpError;
    }
  }

  static async postsByTopic(topicId) {
    try {
      let posts = await PostModel.find({
        topic: topicId
      })
        .populate("topic")
        .populate("author")
        .populate("replies");

      posts = await Promise.all(
        posts.map(async post => {
          const replies = await Promise.all(
            post.replies.map(async reply => {
              const populatedReply = await ReplyDao.findById(reply);

              return populatedReply;
            })
          );
          post.replies = replies;

          return post;
        })
      );

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
      })
        .sort({ created_at: "desc" })
        .populate("topic author");
      return posts;
    } catch (error) {
      const httpError = new Error(error.message);
      httpError.code = 500;

      throw httpError;
    }
  }
}

export default PostDao;
