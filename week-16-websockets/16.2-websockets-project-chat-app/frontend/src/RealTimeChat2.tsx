import { useEffect, useRef, useState } from "react";
import { ChatIcon } from "./icons/ChatIcon";
import toast, { Toaster } from "react-hot-toast";

let ws: WebSocket | null = null;

export const RealTimeChat2 = () => {
  const [roomCode, setRoomCode] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [enteredRoomCode, setEnteredRoomCode] = useState("");

  const generateRoomCode = (num: number) => {
    const options = "abcdefghijklmnopqrstuvwxyz0123456789";
    const length = options.length;
    let ans = "";
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * length);
      ans += options[randomIndex];
    }

    return ans.toUpperCase();
  };

  const handleCreatingRoom = () => {
    const code = generateRoomCode(6);

    setRoomCode(code);
    navigator.clipboard.writeText(code);
    toast.success("Room created successfully", {
      style: {
        color: "white",
        backgroundColor: "transparent",
        fontSize: "14px",
        padding: "8px",
        border: "1px solid #666666",
        borderRadius: "5px",
        borderWidth: "1px",
      },
      iconTheme: {
        primary: "white",
        secondary: "black",
      },
    });
  };

  const handleChatRoom = () => {
    const code = roomCode || enteredRoomCode.toUpperCase();
    if (!code) return;
    setRoomCode(code);
    setHasJoined(true);

    ws?.send(
      JSON.stringify({
        type: "join",
        payload: {
          roomId: code,
        },
      })
    );

    toast.success("Room joined", {
      style: {
        color: "white",
        backgroundColor: "transparent",
        fontSize: "14px",
        padding: "8px",
        border: "1px solid #666666",
        borderRadius: "5px",
        borderWidth: "1px",
      },
      iconTheme: {
        primary: "white",
        secondary: "black",
      },
    });
  };

  const handleSendButton = () => {
    if (ws && inputRef.current) {
      const msg = inputRef.current?.value;
      if (msg?.trim()) {
        ws.send(
          JSON.stringify({
            type: "chat",
            payload: {
              message: msg,
            },
          })
        );
        inputRef.current.value = "";
        setMessages((prev) => [...prev, msg]);
      }
    }
  };

  useEffect(() => {
    ws = new WebSocket("ws:localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      switch (msg.type) {
        case "chat":
          setMessages((prev) => [...prev, msg.payload.message]);
          break;

        default:
          console.warn("unknow msg type", msg.type);
      }
    };
  }, [roomCode]);

  return (
    <div className="bg-black/95 h-screen flex justify-center items-center">
      {!hasJoined ? (
        <div className="container mx-auto max-w-2xl h-screen p-4 flex items-center justify-center">
          <div className="bg-transparent rounded-xl w-full h-auto shadow border border-gray-800/50">
            <div className="flex flex-col p-6 space-y-1">
              <div className="tracking-tight text-2xl text-white flex gap-2 font-bold items-center">
                <ChatIcon />
                Real time chat
              </div>
              <div className="text-gray-400 text-sm">
                temporary room that expires after all users exit
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-4">
                <button
                  onClick={handleCreatingRoom}
                  className="text-black text-lg font-medium whitespace-nowrap w-full flex justify-center items-center border bg-white rounded-md py-2.5 px-4 cursor-pointer transition-colors hover:bg-white/85"
                >
                  Create New Room
                </button>
                <Toaster position="bottom-right" />
                <div className="flex text-gray-400 text-md gap-2">
                  <input
                    className="w-full border border-gray-800 px-3 py-2 rounded-md bg-transparent shadow-sm"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex text-gray-400 text-md gap-2">
                  <input
                    className="w-full border border-gray-800 px-3 py-2 rounded-md bg-transparent shadow-sm"
                    value={enteredRoomCode}
                    type="text"
                    placeholder="Enter room code"
                    onChange={(e) => setEnteredRoomCode(e.target.value)}
                  />
                  <button
                    onClick={handleChatRoom}
                    className="bg-white text-black font-medium flex justify-center items-center whitespace-nowrap px-8 py-2 rounded-md text-sm cursor-pointer transition-colors hover:bg-white/85"
                  >
                    Join Room
                  </button>
                  <Toaster position="bottom-right" />
                </div>
                {roomCode && !hasJoined && (
                  <div className="w-full flex flex-col justify-center items-center p-6 bg-gray-500/25 rounded-md gap-2">
                    <div className="text-md text-slate-400 font-normal">
                      Share this code with your friend
                    </div>
                    <div className="flex justify-center items-center text-2xl text-white">
                      {roomCode}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto max-w-2xl h-screen p-4 flex items-center justify-center">
          <div className="bg-transparent rounded-xl w-full h-screen shadow border border-gray-800/50">
            <div className="flex flex-col p-6 space-y-1">
              <div className="tracking-tight text-2xl text-white flex gap-2 font-bold items-center">
                <ChatIcon />
                Real time chat
              </div>
              <div className="text-gray-400 text-sm">
                temporary room that expires after all users exit
              </div>
            </div>
            <div className="flex flex-col justify-center items-center p-6 gap-4">
              <div className="p-4 w-full h-96 rounded-md border border-gray-800/50">
                {messages.map((msg, index) => (
                  <div key={index} className="text-white">
                    {msg}
                  </div>
                ))}
              </div>
              <div className="text-white flex gap-2">
                <input
                  className="w-full border border-gray-800 px-3 py-2 rounded-md bg-transparent shadow-sm"
                  ref={inputRef}
                  type="text"
                  placeholder="Type a message..."
                />
                <button
                  onClick={handleSendButton}
                  className="bg-white text-black font-medium flex justify-center items-center whitespace-nowrap px-8 py-2 rounded-md text-sm cursor-pointer transition-colors hover:bg-white/85"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
