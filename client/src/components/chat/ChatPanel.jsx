import { useEffect, useRef, useState } from "react";
import socket from "../../services/socket/socket";

export default function ChatPanel({
  meetingId,
  user,
}) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  function sendMessage() {
    if (!message.trim()) return;

    socket.emit("send-message", {
      meetingId,
      sender: user.username,
      message,
    });

    setMessage("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border flex flex-col h-[500px]">

      <div className="border-b p-4">

        <h2 className="text-xl font-bold">
          Chat
        </h2>

      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`rounded-xl p-3 ${
              msg.sender === user.username
                ? "bg-blue-600 text-white ml-10"
                : "bg-slate-100 mr-10"
            }`}
          >

            <p className="font-semibold">
              {msg.sender}
            </p>

            <p className="mt-1">
              {msg.message}
            </p>

            <p className="text-xs mt-2 opacity-70">
              {msg.time}
            </p>

          </div>

        ))}

        <div ref={bottomRef}></div>

      </div>

      <div className="border-t p-4 flex gap-3">

        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-xl px-4 py-3"
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 rounded-xl"
        >
          Send
        </button>

      </div>

    </div>
  );
}