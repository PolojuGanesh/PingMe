import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useContext } from "react";
import { Context } from "../context/Context";
import { CircleMinus, CircleX, Trash } from "lucide-react";

const ChatSettingModal = () => {
  const {
    openChatSetting,
    setOpenChatSetting,
    setChatMessages,
    deleteChatHandler,
    userDetails,
    selectedChat,
    setSelectedChat,
  } = useContext(Context);

  const onCloseModal = () => {
    setOpenChatSetting(false);
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
    setOpenChatSetting(false);
    console.log("Close chat clicked");
  };

  const handleClearChat = () => {
    console.log("Clear chat clicked");
    setChatMessages([]);
    setOpenChatSetting(false);
  };

  const handleDeleteChat = () => {
    console.log("Delete chat clicked");
    deleteChatHandler(userDetails.id, selectedChat._id);
    setSelectedChat(null);
    setOpenChatSetting(false);
  };

  const chatSettingsOptions = [
    {
      id: 2,
      label: "Close chat",
      icon: CircleX,
      onClick: handleCloseChat,
    },
    {
      id: 3,
      label: "Clear chat",
      icon: CircleMinus,
      onClick: handleClearChat,
    },
    {
      id: 4,
      label: "Delete chat",
      icon: Trash,
      onClick: handleDeleteChat,
    },
  ];

  return (
    <Modal
      open={openChatSetting}
      onClose={onCloseModal}
      center
      classNames={{ modal: "bg-white p-4 rounded-lg" }}
    >
      <div>
        {chatSettingsOptions.map((option) => (
          <div
            key={option.id}
            className="p-2 flex items-center gap-2 mt-2 mb-1 border border-white hover:border-red-600 hover:bg-red-100 hover:rounded hover:cursor-pointer"
            onClick={option.onClick}
          >
            <div>
              <option.icon size={25} className="text-md font-medium" />
            </div>
            <div>
              <p className="text-md font-medium text-gray-700">
                {option.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ChatSettingModal;
