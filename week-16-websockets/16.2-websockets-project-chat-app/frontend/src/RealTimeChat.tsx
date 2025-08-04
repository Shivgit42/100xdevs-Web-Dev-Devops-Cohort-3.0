import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChatIcon } from "./icons/ChatIcon";
import { toast, ToastContainer } from "react-toastify";
import { CopyIcon } from "./icons/CopyIcon";
import { Moon, Sun } from "lucide-react";

let socket: WebSocket;

export default function RealTimeChat() {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [joined, setJoined] = useState(false);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [theme, setTheme] = useState("dark");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const connectSocket = () => {
    socket = new WebSocket(`ws://${window.location.hostname}:8080`);

    socket.onopen = () => {
      console.log("Connected to WebSocket");
      if (joined && roomCode) {
        socket.send(
          JSON.stringify({
            type: "join",
            payload: { roomId: roomCode, name },
          })
        );
      }
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      switch (msg.type) {
        case "chat":
          setChat((prev) => [
            ...prev,
            `${msg.payload.sender}: ${msg.payload.message}`,
          ]);
          break;

        case "users":
          setUserCount(msg.payload.count);
          break;

        case "notification":
          setChat((prev) => [...prev, `[System]: ${msg.payload.message}`]);
          break;

        default:
          console.warn("Unknown message type", msg.type);
      }
    };

    socket.onclose = () => {
      console.warn("WebSocket disconnected. Attempting to reconnect in 3s...");
      setTimeout(connectSocket, 3000);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      socket.close();
    };
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const createRoom = () => {
    const newRoom = uuidv4().slice(0, 6).toUpperCase();
    setRoomCode(newRoom);

    toast.success("Room created successfully!");
  };

  const handleCopyToClipboard = () => {
    const code = roomCode;
    navigator.clipboard.writeText(code);

    toast.success("Room code copied to clipboard!");
  };

  const joinRoom = () => {
    if (!roomCode || !name) {
      toast.error("Please enter a room code and name");
      return;
    }
    socket.send(
      JSON.stringify({
        type: "join",
        payload: { roomId: roomCode, name },
      })
    );
    setJoined(true);

    toast.success("Joined room successfully!");
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.send(
      JSON.stringify({
        type: "chat",
        payload: { message },
      })
    );
    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] text-black dark:text-white flex items-center justify-center min-h-screen transition-colors duration-300">
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50 border border-gray-500/30 rounded-lg">
        <button
          onClick={toggleTheme}
          className="rounded shadow-md px-3 py-2 cursor-pointer text-black dark:text-white transition-all ease-in-out hover:bg-gray-500/10 dark:hover:bg-white/5"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>

      {/* Join/Create Room View */}
      {!joined ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl min-h-screen flex items-center justify-center">
          <div className="bg-transparent rounded-xl w-full h-auto shadow-xl border border-gray-500/30">
            <div className="flex flex-col p-6 space-y-1">
              <div className="tracking-tight text-xl sm:text-2xl flex gap-2 font-bold items-center">
                <ChatIcon />
                <h1>Real Time Chat</h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-600/90 dark:text-gray-400 mb-4">
                Temporary room that expires after all users exit
              </p>

              <div className="sm:pt-2.5 pt-1.5">
                <button
                  className="w-full py-2.5 px-4 mb-4 bg-[#0a0a0a] text-white dark:bg-white text-lg dark:text-black rounded-md font-semibold hover:bg-black/90 dark:hover:bg-white/90 cursor-pointer"
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
                className="w-full px-4 py-2 mb-3 rounded-md shadow-sm bg-white text-black dark:bg-transparent dark:text-white border border-gray-500/30"
              />

              <div className="flex flex-col sm:flex-row sm:gap-2 gap-3">
                <input
                  type="text"
                  placeholder="Enter Room Code"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-2 rounded-md shadow-sm bg-white text-black dark:bg-transparent dark:text-white border border-gray-500/30"
                />
                <button
                  className="w-full sm:w-auto px-8 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md font-semibold hover:bg-black/90 dark:hover:bg-white/90 cursor-pointer"
                  onClick={joinRoom}
                >
                  Join Room
                </button>
              </div>

              {roomCode && (
                <div className="flex flex-col justify-center items-center w-full mt-3 p-6 bg-gray-300/30 dark:bg-gray-600/30 rounded-md">
                  <p className="text-center text-sm sm:text-md text-black/70 dark:text-gray-400">
                    Share this code with your friend
                  </p>
                  <div className="flex items-center gap-2 text-xl sm:text-2xl pt-2 font-bold tracking-widest">
                    {roomCode}
                    <div
                      onClick={handleCopyToClipboard}
                      className="cursor-pointer relative top-[1px]"
                    >
                      <CopyIcon />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Chat Room View
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl h-screen flex items-center justify-center">
          <div className="bg-transparent rounded-xl w-full h-auto shadow-xl border border-gray-800/50">
            <div className="flex flex-col p-6 space-y-1">
              <div className="tracking-tight text-xl sm:text-2xl flex gap-2 font-bold items-center">
                <ChatIcon />
                <h1>Real Time Chat</h1>
              </div>
              <div className="text-xs sm:text-sm text-gray-600/90 dark:text-gray-400">
                Temporary room that expires after all users exit
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6 items-center bg-slate-300/35 dark:bg-gray-500/25 p-4 rounded-md mb-4 text-sm text-black/70 dark:text-gray-400">
                <div className="flex gap-2 items-center">
                  Room Code: <strong>{roomCode}</strong>
                  <div
                    onClick={handleCopyToClipboard}
                    className="cursor-pointer"
                  >
                    <CopyIcon width={16} height={16} />
                  </div>
                </div>
                <span>Users: {userCount ?? "n/a"}</span>
              </div>

              <div className="h-64 sm:h-80 md:h-96 overflow-y-auto border border-gray-500/25 p-4 rounded-md mb-4">
                {chat.map((msg, idx) => {
                  const isSystem = msg.startsWith("[System]:");
                  const sender = msg.split(": ")[0];
                  const content = msg.split(": ").slice(1).join(": ");

                  return (
                    <div
                      key={idx}
                      className={`mb-2 ${
                        isSystem
                          ? "text-center text-gray-400 text-sm"
                          : sender === name
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      <span
                        className={`px-3 py-1 rounded-lg inline-block ${
                          isSystem
                            ? "bg-gray-500/20"
                            : "dark:bg-white dark:text-black bg-black text-white"
                        }`}
                      >
                        {content}
                      </span>
                      {!isSystem && (
                        <div className="text-xs dark:text-gray-400 text-black/70 mt-1">
                          {sender}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-2 gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && message.trim()) {
                      sendMessage();
                    }
                  }}
                  className="flex-1 px-4 py-2 rounded-md shadow-sm border bg-white text-black dark:bg-transparent dark:text-white border-gray-500/30"
                />
                <button
                  onClick={sendMessage}
                  className="w-full sm:w-auto px-8 py-2 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-md hover:bg-black/90 dark:hover:bg-white/90 cursor-pointer"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        toastStyle={{
          backgroundColor: "black",
          color: "white",
          fontSize: "14px",
          padding: "8px",
          border: "1px solid #666666",
          borderRadius: "5px",
        }}
      />
    </div>
  );
}
