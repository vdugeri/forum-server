import PostDao from "api/posts/posts.dao";

const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await PostDao.userPosts(userId);
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

export default getUserPosts;
