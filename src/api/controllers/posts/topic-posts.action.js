import mongoose from "mongoose";

import Post from "../../models/topic.model";

const topicPosts = async (req, res) => {
  const { topicId } = req.params;
  try {
    const posts = await Post.find({ topic: mongoose.Types.ObjectId(topicId) });
    return res.status(200).json({
      succes: true,
      posts
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message
    });
  }
};

export default topicPosts;
