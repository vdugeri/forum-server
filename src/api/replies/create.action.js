import ReplyDao from "./replies.dao";

const createReply = async (req, res) => {
  const { author, text, post } = req.body;
  try {
    const postWithReply = await ReplyDao.createReply({ author, text, post });
    return res.status(201).json({ post: postWithReply });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default createReply;
