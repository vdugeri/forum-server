import messageEvents from "./message-events";
import { io } from "../../sockets";

class MessageEventEmitter {
  static emitMessageSent(message) {
    io.on("connection", client => {
      client.emit(messageEvents.MESSAGE_RECEIVED, message);
    });
  }
  static emitMessageRead(message) {
    io.on("connection", client => {
      client.emit(messageEvents.MESSAGE_READ, message);
    });
  }
  static emitMessageError(error) {
    io.on("connection", client => {
      client.emit(messageEvents.MESSAGE_ERROR, error);
    });
  }
}

export default MessageEventEmitter;
