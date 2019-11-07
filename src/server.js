import http from "http";
import logger from "debug";

import app from "app";
import startDb from "db";
import { socketEvents } from "sockets";

const port = normalizePort(process.env.PORT || "8081");
app.set("port", port);

const server = http.createServer(app);

startDb();
socketEvents();

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP Server "error" event
 */
function onError() {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCESS":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "Pipe " + addr : "Port " + addr.port;
  console.log("Listening on " + bind);
}

export default server;
