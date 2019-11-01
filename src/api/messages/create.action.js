import MessageDao from "./messages.dao";
import MessageEventEmitter from "./event-emitter";

const sendMessage = async (req, res) => {
  const { sender, receiver, text } = req.body;
  try {
    const message = await MessageDao.send({ sender, receiver, text });
    MessageEventEmitter.emitMessageSent(message);
    return res.status(201).json(message);
  } catch (error) {
    MessageEventEmitter.emitMessageError(error);
    return res.status(500).json({
      message: error.message
    });
  }
};

export default sendMessage;
