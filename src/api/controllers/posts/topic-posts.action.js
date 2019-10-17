import PostDao from "./posts.dao";

const topicPosts = async (req, res) => {
  const { topicId } = req.params;
  try {
    const posts = await PostDao.postsByTopic(topicId);
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

export default topicPosts;
