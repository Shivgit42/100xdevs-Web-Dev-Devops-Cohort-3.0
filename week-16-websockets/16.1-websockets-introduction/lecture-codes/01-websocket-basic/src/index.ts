import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("user connected");
  setInterval(() => {
    socket.send("Current price of Solana is " + Math.random());
  }, 500);

  socket.on("message", (e) => {
    console.log(e.toString());
  });
});
