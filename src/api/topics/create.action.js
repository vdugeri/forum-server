import TopicDao from "./topic.dao";

const createTopic = async (req, res) => {
  const { name, linkUrl, icon } = req.body;
  try {
    const topic = await TopicDao.createTopic({ name, linkUrl, icon });
    return res.status(201).json({ topic });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

export default createTopic;
