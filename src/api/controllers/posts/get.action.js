import mongoose from "mongoose";
import Post from "../../models/post.model";

const getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(mongoose.Types.ObjectId(postId)).populate(
      "topic author"
    );
    if (!post) {
      return res.status(404).json({
        error: true,
        message: "Post not found"
      });
    }
    return res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message
    });
  }
};

export default getPost;
