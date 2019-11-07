import mongoose from "mongoose";
import PostModel from "api/posts/post.model";
import ReplyDao from "api/replies/replies.dao";

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
      let post = await PostModel.findById(postId).populate(
        "topic author replies"
      );

      const replies = await ReplyDao.repliesForPost(postId);
      post.replies = replies;

      return post;
    } catch (error) {
      throw error;
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
          const replies = await ReplyDao.repliesForPost(post._id);
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
