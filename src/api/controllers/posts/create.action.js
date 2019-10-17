import Post from "../../models/post.model";

const createPost = async (req, res) => {
  const { topic, author, body, title } = req.body;
  try {
    const post = new Post({ topic, author, body, title });
    const errorData = post.validateSync();

    if (errorData) {
      return res.status(400).json({
        error: true,
        errors: errorData.errors
      });
    }
    await post.save();
    return res.status(201).json({
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

export default createPost;
