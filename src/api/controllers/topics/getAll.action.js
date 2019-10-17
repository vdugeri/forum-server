import Topic from "../../models/topic.model";

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    return res.status(200).json({
      success: true,
      topics
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message
    });
  }
};

export default getAllTopics;
