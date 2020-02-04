import PostDao from "api/posts/posts.dao";

const createPost = async (req, res) => {
  const { topicId, author, body, title } = req.body;
  try {
    const post = await PostDao.createPost({
      topic: topicId,
      body,
      title,
      author: author.user
    });

    return res.status(201).json({ post });
  } catch (error) {
    return res.status(error.code).json({
      message: error.message
    });
  }
};

export default createPost;
