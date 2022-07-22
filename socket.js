function realtime(io) {
  io.on("connection", (Socket) => {
    //.....
    Socket.emit("socket-test", "hello");
  });
}

module.exports = realtime;
