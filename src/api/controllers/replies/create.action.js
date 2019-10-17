import mongoose from "mongoose";
import Reply from "../../models/reply.model";

const createReply = async (req, res) => {
  const { author, text, post } = req.body;
  try {
    const reply = new Reply({ author, text, post });
    const errorData = reply.validateSync();
    if (errorData) {
      return res.status(400).json({
        error: true,
        errors: errorData.errors
      });
    }

    await reply.save();
    return res.status(201).json({
      success: true,
      reply
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message
    });
  }
};

export default createReply;
