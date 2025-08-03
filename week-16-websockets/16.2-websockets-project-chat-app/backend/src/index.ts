// import { WebSocketServer, WebSocket } from "ws";

// const wss = new WebSocketServer({ port: 8080 });

// interface User {
//   socket: WebSocket;
//   room: string;
// }

// // let userCount = 0;
// let allSockets: User[] = [];

// wss.on("connection", (socket) => {
//   // userCount += 1;

//   socket.on("message", (message) => {
//     //@ts-ignore
//     const parsedMessage = JSON.parse(message);
//     if (parsedMessage.type === "join") {
//       console.log("user joined to room " + parsedMessage.payload.roomId);
//       allSockets.push({
//         socket,
//         room: parsedMessage.payload.roomId,
//       });
//     }

//     if (parsedMessage.type === "chat") {
//       console.log("user want to chat");
//       const currentUserRoom = allSockets.find((x) => x.socket === socket)?.room;
//       if (currentUserRoom) {
//         allSockets.forEach((user) => {
//           if (user.room === currentUserRoom) {
//             user.socket.send(parsedMessage.payload.message);
//           }
//         });
//       }
//     }
//   });
// });

//? trying the optimal way
import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//Rooms and their members
const rooms = new Map<string, Set<WebSocket>>();
/*
{
"room1": Set { WebSocket1, WebSocket2, WebSocket3 },
"room2": Set { WebSocket4, WebSocket5 }
}
*/

//Map each user to a room
const user = new Map<WebSocket, string>();

/*
{
WebSocket1 => "room1",
WebSocket3 => "room1",
WebSocket5 => "room2",
}
*/

const messageHistory = new Map<string, string[]>();

interface JoinMessage {
  type: "join";
  payload: {
    roomId: string;
  };
}

interface ChatMessage {
  type: "chat";
  payload: {
    message: string;
  };
}

type MessagePayload = JoinMessage | ChatMessage;

wss.on("connection", (ws: WebSocket) => {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    let reqObj: MessagePayload;

    try {
      reqObj = JSON.parse(data.toString());
    } catch (err) {
      ws.send("Invalid message format");
      return;
    }

    if (reqObj.type === "join") {
      const roomName = reqObj.payload.roomId;

      if (!rooms.has(roomName)) {
        rooms.set(roomName, new Set());
      }

      rooms.get(roomName)?.add(ws);
      user.set(ws, roomName);

      ws.send(`You joined room "${roomName}" successfully`);

      const roomUsers = rooms.get(roomName)?.size || 0;
      rooms.get(roomName)?.forEach((member) => {
        member.send(
          JSON.stringify({
            type: "users",
            payload: { count: roomUsers },
          })
        );
      });

      const history = messageHistory.get(roomName) || [];
      history.forEach((message) => {
        ws.send(
          JSON.stringify({
            type: "chat",
            payload: { message },
          })
        );
      });
    }

    if (reqObj.type === "chat") {
      const roomName = user.get(ws);
      const message = reqObj.payload.message;

      if (roomName && message) {
        if (!messageHistory.has(roomName)) {
          messageHistory.set(roomName, []);
        }
        messageHistory.get(roomName)?.push(message);

        rooms.get(roomName)?.forEach((member) => {
          if (member.readyState === WebSocket.OPEN) {
            try {
              member.send(
                JSON.stringify({
                  type: "chat",
                  payload: { message },
                })
              );
            } catch (e) {
              console.error("Error sending message to a member" + e);
            }
          }
        });
      } else {
        ws.send("You are not in any room. Join a room first.");
      }
    }
  });

  ws.on("close", () => {
    const roomName = user.get(ws);
    if (roomName && rooms.has(roomName)) {
      rooms.get(roomName)?.delete(ws);
      user.delete(ws);

      // Update user count
      const count = rooms.get(roomName)?.size || 0;
      rooms.get(roomName)?.forEach((member) => {
        member.send(
          JSON.stringify({
            type: "users",
            payload: { count },
          })
        );
      });
    }
  });
});

//? notes
// 🧠 Analogy:
// Think of it like a school:

// Question	                                         Map Used	                          Example
// Who are the students in Class A?	                   room 	                  "ClassA" → Set{Alice, Bob}
// Which class is Alice in?	                           user	                        Alice → "ClassA"
