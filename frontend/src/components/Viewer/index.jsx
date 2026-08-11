import { ArrowLeft, EllipsisVertical } from "lucide-react";

const chatMessagesData = [
  { id: 1, message: "Hello!", time: "10:30 AM", isSent: true },
  { id: 2, message: "How are you?", time: "10:32 AM", isSent: false },
  { id: 3, message: "Let's meet up.", time: "10:35 AM", isSent: true },
  { id: 4, message: "See you soon.", time: "10:40 AM", isSent: false },
  { id: 5, message: "Goodbye!", time: "10:45 AM", isSent: true },
  { id: 6, message: "Take care.", time: "10:50 AM", isSent: false },
  { id: 7, message: "Have a great day!", time: "10:55 AM", isSent: true },
  { id: 8, message: "What's up?", time: "11:00 AM", isSent: false },
  { id: 9, message: "Long time no see.", time: "11:05 AM", isSent: true },
  { id: 10, message: "Catch you later.", time: "11:10 AM", isSent: false },
  { id: 11, message: "Stay safe!", time: "11:15 AM", isSent: true },
  { id: 12, message: "Talk to you soon.", time: "11:20 AM", isSent: false },
];

const Viewer = ({ selectedChat, setSelectedChat }) => {
  if (!selectedChat) {
    return (
      <section className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            Welcome to PingMe
          </h2>
          <p className="mt-2 text-gray-500">
            Select a chat to start messaging.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col flex-1 bg-gray-50 h-full">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gray-100 border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Back Button */}
          <button onClick={() => setSelectedChat(null)} className="md:hidden">
            <ArrowLeft size={22} />
          </button>

          <div className="w-11 h-11 rounded-full overflow-hidden">
            <img
              src={selectedChat.imageUrl}
              alt={selectedChat.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="font-semibold">{selectedChat.mobile}</h2>

            <p className="text-sm text-gray-500">{selectedChat.name}</p>
          </div>
        </div>

        <EllipsisVertical className="cursor-pointer hover:text-red-500" />
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {chatMessagesData.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isSent ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-xl px-4 py-2 ${
                message.isSent
                  ? "bg-violet-500 text-white"
                  : "bg-white text-black border"
              }`}
            >
              <p>{message.message}</p>

              <p
                className={`text-[10px] mt-1 text-right ${
                  message.isSent ? "text-violet-100" : "text-gray-500"
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </main>

      {/* Message Input */}
      <footer className="border-t bg-white p-3">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="
              flex-1
              rounded-full
              border
              bg-gray-100
              px-4
              py-3
              outline-none
              focus:border-violet-500
            "
          />

          <button
            className="
              rounded-full
              bg-violet-600
              px-5
              py-3
              text-white
              hover:bg-violet-700
            "
          >
            Send
          </button>
        </div>
      </footer>
    </section>
  );
};

export default Viewer;
