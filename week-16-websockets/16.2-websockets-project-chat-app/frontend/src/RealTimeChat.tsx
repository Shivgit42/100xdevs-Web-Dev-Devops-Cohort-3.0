import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChatIcon } from "./icons/ChatIcon";
import { toast, ToastContainer } from "react-toastify";

const socket = new WebSocket("ws://localhost:8080");

export default function RealTimeChat() {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [joined, setJoined] = useState(false);
  const [userCount, setUserCount] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const createRoom = () => {
    const newRoom = uuidv4().slice(0, 6).toUpperCase();
    setRoomCode(newRoom);

    toast.success("Room created successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

      style: {
        color: "white",
        backgroundColor: "transparent",
        fontSize: "14px",
        padding: "8px",
        border: "1px solid #666666",
        borderRadius: "5px",
        borderWidth: "1px",
      },
    });
  };

  const joinRoom = () => {
    if (!roomCode || !name) {
      toast.error("Please enter a room code and name", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

        style: {
          color: "white",
          backgroundColor: "transparent",
          fontSize: "14px",
          padding: "8px",
          border: "1px solid #666666",
          borderRadius: "5px",
          borderWidth: "1px",
        },
      });
      return;
    }
    socket.send(
      JSON.stringify({
        type: "join",
        payload: { roomId: roomCode },
      })
    );
    setJoined(true);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.send(
      JSON.stringify({
        type: "chat",
        payload: { message: `${name}: ${message}` },
      })
    );
    setMessage("");
  };

  useEffect(() => {
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      switch (msg.type) {
        case "chat":
          setChat((prev) => [...prev, msg.payload.message]);
          break;

        case "users":
          setUserCount(msg.payload.count);
          break;

        default:
          console.warn("Unknown message type", msg.type);
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className=" bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="container mx-auto max-w-2xl h-screen p-4 flex items-center justify-center">
        <div className="bg-transparent rounded-xl w-full h-auto shadow-xl border border-gray-800/50">
          <div className="flex flex-col p-6 space-y-1">
            {!joined ? (
              <>
                <div className="tracking-tight text-2xl text-white flex gap-2 font-bold items-center">
                  <ChatIcon />
                  <h1 className="text-2xl font-bold">Real Time Chat</h1>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  temporary room that expires after all users exit
                </p>
                <div className="pt-3">
                  <button
                    className="w-full py-2.5 px-4 mb-4 bg-white text-lg text-black rounded font-semibold whitespace-nowrap hover:bg-white/90 cursor-pointer"
                    onClick={createRoom}
                  >
                    Create New Room
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 mb-3 rounded-md shadow-sm border border-gray-800/50"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Room Code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2 rounded-md shadow-sm border border-gray-800/50"
                  />
                  <button
                    className="px-8 py-2 bg-white text-black rounded text-sm font-semibold cursor-pointer hover:bg-white/90"
                    onClick={joinRoom}
                  >
                    Join Room
                  </button>
                  <ToastContainer position="bottom-right" />
                </div>
                {roomCode && (
                  <p className="text-center text-sm text-gray-400 mt-4">
                    Share this code with your friend
                    <br />
                    <span className="text-xl font-bold tracking-widest">
                      {roomCode}
                    </span>
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                  <span>
                    Room Code: <strong>{roomCode}</strong>
                  </span>
                  <span>Users: {userCount ?? "n/a"}</span>
                </div>
                <div className="h-72 overflow-y-auto bg-zinc-800 p-4 rounded mb-4">
                  {chat.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`mb-2 ${
                        msg.startsWith(name) ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="bg-white text-black px-3 py-1 rounded-lg inline-block">
                        {msg.split(": ").slice(1).join(": ")}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">
                        {msg.split(": ")[0]}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-l bg-zinc-800 outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-white text-black font-semibold rounded-r"
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
