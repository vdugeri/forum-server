import PostDao from "./posts.dao";

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostDao.getAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(error.code).json({
      message: error.message
    });
  }
};

export default getAllPosts;
