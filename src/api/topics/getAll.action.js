import TopicDao from "api/topics/topic.dao";

const getAllTopics = async (req, res) => {
  try {
    const topics = await TopicDao.allTopics();
    return res.status(200).json(topics);
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

export default getAllTopics;
