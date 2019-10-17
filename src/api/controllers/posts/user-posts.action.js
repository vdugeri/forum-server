import mongoose from "mongoose";
import Post from "../../models/post.model";

const getUserPosts = async (req, res) => {
  const { userId } = req.params.userId;
  try {
    const posts = await Post.find({ author: mongoose.Types.ObjectId(userId) });
    return res.status(200).json({
      success: true,
      posts
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message
    });
  }
};

export default getUserPosts;
