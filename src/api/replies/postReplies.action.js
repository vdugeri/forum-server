import ReplyDao from "./replies.dao";

const getRepliesForPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const replies = await ReplyDao.repliesForPost(postId);
    return res.status(200).json({ replies });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default getRepliesForPost;
