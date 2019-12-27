import PostDao from "api/posts/posts.dao";

const getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostDao.getById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default getPost;
