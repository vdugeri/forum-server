import mongoose from "mongoose";
import Reply from "../../models/reply.model";

const getRepliesForPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const replies = await Reply.find({ post: mongoose.Types.ObjectId(postId) });
    return res.status(200).json({
      success: true,
      replies
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.messages
    });
  }
};

export default getRepliesForPost;
