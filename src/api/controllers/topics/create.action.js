import Topic from "../../models/topic.model";

const createTopic = async (req, res) => {
  const { name, linkUrl, icon } = req.body;
  try {
    const topic = new Topic({ name, linkUrl, icon });
    const errorData = topic.validateSync();
    if (errorData) {
      return res.status(400).json({
        error: true,
        errors: errorData.errors
      });
    }
    await topic.save();
    return res.status(201).json({
      success: true,
      topic
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message
    });
  }
};

export default createTopic;
