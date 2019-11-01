import MessageDao from "./messages.dao";

const getUserMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const userMessages = await MessageDao.getUserMessages(userId);
    return res.status(200).json({ messages: userMessages });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default getUserMessages;
