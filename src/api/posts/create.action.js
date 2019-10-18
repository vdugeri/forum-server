import PostDao from "./posts.dao";

const createPost = async (req, res) => {
  const { topic, author, body, title } = req.body;

  try {
    const post = await PostDao.createPost({ topic, author, body, title });
    return res.status(201).json({ post });
  } catch (error) {
    return res.status(error.code).json({
      message: error.message
    });
  }
};

export default createPost;
