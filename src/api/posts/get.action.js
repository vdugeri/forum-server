import PostDao from "./posts.dao";

const getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostDao.getById(postId);
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

export default getPost;
