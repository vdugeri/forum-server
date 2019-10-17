import ReplyDao from "./replies.dao";

const createReply = async (req, res) => {
  const { author, text, post } = req.body;
  try {
    const post = ReplyDao.createReply({ author, text, post });
    return res.status(201).json({ reply });
  } catch (error) {
    return res.status(error.code).json({ message: error.message });
  }
};

export default createReply;
