import PostDao from "api/posts/posts.dao";

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await PostDao.deletePost(id);
    return res.status(204).json({});
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default deletePost;
