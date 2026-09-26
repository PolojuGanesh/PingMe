import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../context/Context";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import ChatSettingModal from "../Modal/ChatSettingModal";
import { assets } from "../../assets/assets";

const Viewer = () => {
  const {
    setOpenChatSetting,
    chatMessages,
    selectedChat,
    setSelectedChat,
    userDetails,
    inputMessage,
    setInputMessage,
    sendMessageHandler,
    apiUrl,
  } = useContext(Context);
  const [expandedMessages, setExpandedMessages] = useState({});
  const bottomRef = useRef(null);

  const toggleMessage = (id) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView([{ behavior: "smooth" }]);
  }, [chatMessages]);

  const getMessageDateLabel = (createdAt) => {
    const messageDate = new Date(createdAt);
    const todayDate = new Date();

    const messageDay = new Date(
      messageDate.getFullYear(),
      messageDate.getMonth(),
      messageDate.getDate(),
    );

    const today = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate(),
    );

    const difference = (today - messageDay) / (1000 * 60 * 60 * 24);

    if (difference === 0) {
      return "Today";
    }

    if (difference === 1) {
      return "Yesterday";
    }

    return messageDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!selectedChat) {
    return (
      <section className="hidden md:flex flex-col flex-1 items-center justify-center bg-gray-50 overflow-x-hidden">
        <div>
          <img src={assets.viewer} alt="image" className="h-96" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-purple-700">
            Welcome to PingMe
          </h2>
          <p className="mt-2 text-orange-500 font-medium">
            Select a chat to start messaging.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col flex-1 w-0 min-w-0 bg-gray-50 h-full overflow-hidden">
        {/* Header */}
        <header className="shrink-0 sticky top-0 z-20 bg-gray-100 border-b px-4 py-3 flex items-center justify-between min-w-0">
          <div className="flex items-center gap-4 min-w-0">
            {/* Mobile Back Button */}
            <button
              onClick={() => setSelectedChat(null)}
              className="md:hidden shrink-0"
            >
              <ArrowLeft size={22} />
            </button>

            <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
              <img
                src={
                  selectedChat.profileImage === ""
                    ? assets.profileimage
                    : `${apiUrl}/images/${selectedChat.profileImage}`
                }
                alt={selectedChat.username}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h2 className="font-semibold truncate">
                {selectedChat.mobileNumber}{" "}
                {userDetails?.id === selectedChat._id && (
                  <span className="text-red-500 font-semibold">(You)</span>
                )}
              </h2>
              <p className="text-sm text-gray-500 truncate">
                {selectedChat.username}
              </p>
            </div>
          </div>

          <EllipsisVertical
            onClick={() => setOpenChatSetting(true)}
            className="cursor-pointer hover:text-red-500 shrink-0"
          />
        </header>

        {/* Messages */}
        <main
          className="flex-1
            min-h-0
            min-w-0
            w-full
            overflow-y-auto
            overflow-x-hidden
            px-2
            sm:px-3
            md:px-4
            py-4
            space-y-3"
        >
          {chatMessages.map((message, index) => {
            const isMine = String(message.senderId) === String(userDetails?.id);

            const currentDate = new Date(message.createdAt).toDateString();

            const previousDate =
              index > 0
                ? new Date(chatMessages[index - 1].createdAt).toDateString()
                : null;

            const showDate = currentDate !== previousDate;
            return (
              <div key={message._id} className="w-full min-w-0">
                {showDate && (
                  <div className="flex justify-center my-4">
                    <span className="bg-gray-200 px-3 py-1 rounded-md text-xs text-gray-600">
                      {getMessageDateLabel(message.createdAt)}
                    </span>
                  </div>
                )}
                <div
                  className={`flex w-full min-w-0 ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`min-w-0
                      w-auto
                      max-w-[90%]
                      sm:max-w-[80%]
                      md:max-w-[70%]
                      lg:max-w-[60%]
                      xl:max-w-[55%]
                      overflow-hidden
                      rounded-tl-xl
                      rounded-tr-xl
                      rounded-br-xl
                      px-3
                      sm:px-4
                      py-2  ${
                        isMine
                          ? "bg-violet-500 text-white"
                          : "bg-white text-black border"
                      }`}
                  >
                    <p
                      className={`min-w-0 max-w-full whitespace-pre-wrap break-words [overflow-wrap:anywhere] ${
                        expandedMessages[message._id] ? "" : "line-clamp-4"
                      }`}
                    >
                      {message.text}
                    </p>

                    {!expandedMessages[message._id] &&
                      message.text.length > 150 && (
                        <button
                          onClick={() => toggleMessage(message._id)}
                          className={`font-medium cursor-pointer block mt-1 text-sm whitespace-nowrap ${
                            isMine ? "text-black" : "text-violet-600"
                          }`}
                        >
                          ...Show more
                        </button>
                      )}

                    {expandedMessages[message._id] && (
                      <button
                        onClick={() => toggleMessage(message._id)}
                        className={`font-medium cursor-pointer block mt-1 text-sm whitespace-nowrap ${
                          isMine ? "text-black" : "text-violet-600"
                        }`}
                      >
                        Show less
                      </button>
                    )}

                    <p
                      className={`text-[10px] mt-1 text-right whitespace-nowrap ${
                        isMine ? "text-violet-100" : "text-gray-500"
                      }`}
                    >
                      {new Date(message.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <div ref={bottomRef}></div>
                </div>
              </div>
            );
          })}
        </main>

        {/* Message Input */}
        <footer className="border-t bg-white p-3 shrink-0 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="
              flex-1
              min-w-0
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
              onClick={sendMessageHandler}
              className="
              shrink-0
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
      <ChatSettingModal setSelectedChat={setSelectedChat} />
    </>
  );
};

export default Viewer;
