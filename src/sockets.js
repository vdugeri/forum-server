import socketIO from "socket.io";

import server from "./server";
import handlers from "./api/messages/event-emitter";
import messageEvents from "./api/messages/message-events";

const io = socketIO(server);
let socketClient;

function socketEvents() {
  io.on("connection", client => {
    client.on(messageEvents.MESSAGE_SENT, handlers.handleMessageSent);
    client.on(messageEvents.MESSAGE_READ, handlers.handleMessageRead);
    client.on(messageEvents.MESSAGE_ERROR, handlers.handleMessageError);
  });
}

export { io, socketEvents };
