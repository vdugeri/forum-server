import mongoose from "mongoose";
import MessageModel from "api/messages/message.model";

class MessageDao {
  static async send(messageDTO) {
    try {
      const message = new MessageModel(messageDTO);
      const error = message.validateSync();
      if (error) {
        throw error;
      }
      await message.save();
      return message;
    } catch (error) {
      throw error;
    }
  }

  static async getUserMessages(userId) {
    try {
      const messages = await MessageModel.find({
        $or: [{ sender: userId }, { receiver: userId }]
      }).populate("sender receiver");

      return messages;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMessage(messageId) {
    try {
      await MessageModel.deleteOne({ id: mongoose.Types.ObjectId(message) });
    } catch (error) {
      throw error;
    }
  }
}

export default MessageDao;
