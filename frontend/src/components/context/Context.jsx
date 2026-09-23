import { children, createContext, useState, useEffect } from "react";
import Cookies from "js-cookies";
import socket from "../../socket/socket";
import { toast } from "react-toastify";

export const Context = createContext(null);

const ContextProvider = (props) => {
  const [jwtToken, setJwtToken] = useState(
    Cookies.getItem("jwt_token") || null,
  );

  const [userDetails, setUserDetails] = useState(
    JSON.parse(Cookies.getItem("user")) || null,
  );

  const [inputMessage, setInputMessage] = useState("");

  const [selectedChat, setSelectedChat] = useState(null);

  const [openProfile, setOpenProfile] = useState(false);
  const [openChatSetting, setOpenChatSetting] = useState(false);

  const [chatMessages, setChatMessages] = useState([]);

  const [allContacts, setAllContacts] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const apiUrl = "http://localhost:3000/api";

  const fetchContacts = async () => {
    if (!userDetails?.id) return;

    try {
      const response = await fetch(`${apiUrl}/get-contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userDetails.id,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAllContacts(data.contacts || []);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [apiUrl, userDetails?.id]);

  const addToContactsHandler = async (contact, ownId) => {
    try {
      const response = await fetch(`${apiUrl}/add-to-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: contact._id,
          ownId: ownId,
        }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        toast.success(responseData.message);

        // Refresh contacts state immediately
        await fetchContacts();

        // Exit search mode
        setSearchInput("");
        setSearchResults([]);
      } else {
        toast.error(responseData.message || "Failed to add contact");
      }
    } catch (error) {
      console.error("Error adding user to contacts:", error);
      toast.error("Something went wrong while adding contact");
    }
  };

  const deleteChatHandler = async (ownId, userId) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownId: ownId, userId: userId }),
      };
      const response = await fetch(`${apiUrl}/delete-chat`, options);

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        toast.success(responseData.message);

        await fetchContacts();
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Failed to delete chat");
    }
  };

  const sendMessageHandler = () => {
    if (inputMessage.trim() === "") {
      alert("Please enter a message before sending.");
      return;
    }

    if (!selectedChat?._id) {
      alert("Please select a chat");
      return;
    }

    if (!userDetails?.id) {
      alert("User not found");
      return;
    }

    const messageData = {
      senderId: userDetails.id,
      receiverId: selectedChat._id,
      text: inputMessage.trim(),
    };

    // console.log("Sending:", messageData);

    socket.emit("send_message", messageData);

    setInputMessage(""); // Clear the input after sending
  };

  const contextValue = {
    apiUrl,
    jwtToken,
    setJwtToken,
    userDetails,
    setUserDetails,
    openProfile,
    setOpenProfile,
    openChatSetting,
    setOpenChatSetting,
    chatMessages,
    setChatMessages,
    allContacts,
    setAllContacts,
    addToContactsHandler,
    searchInput,
    setSearchInput,
    searchResults,
    setSearchResults,
    deleteChatHandler,
    selectedChat,
    setSelectedChat,
    inputMessage,
    setInputMessage,
    sendMessageHandler,
    fetchContacts,
  };

  useEffect(() => {
    const handleConnect = () => {
      // console.log(`Socket connected: ${socket.id}`);

      if (userDetails?.id) {
        socket.emit("join_user", userDetails.id);

        // console.log("Joined room:", userDetails.id);
      }
    };

    if (jwtToken && userDetails?.id) {
      socket.on("connect", handleConnect);
      socket.connect();
    } else {
      socket.disconnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.disconnect();
    };
  }, [jwtToken, userDetails?.id]);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      // console.log("Received message:", message);

      const currentUserId = String(userDetails?.id);
      const selectedUserId = String(selectedChat?._id);

      const senderId = String(message.senderId);
      const receiverId = String(message.receiverId);

      const isMessageBelongsToSelectedChat =
        (senderId === currentUserId && receiverId === selectedUserId) ||
        (senderId === selectedUserId && receiverId === currentUserId);

      if (isMessageBelongsToSelectedChat) {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [selectedChat?._id, userDetails?.id]);

  const getChatMessagesHandler = async () => {
    if (!userDetails?.id || !selectedChat?._id) {
      return;
    }

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentUserId: userDetails.id,
          selectedUserId: selectedChat._id,
        }),
      };
      const response = await fetch(`${apiUrl}/get-chat-messages`, options);
      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setChatMessages(responseData.messages);
      }
    } catch (error) {
      console.error("Error getting messages:", error);
    }
  };

  useEffect(() => {
    if (selectedChat?._id && userDetails?.id) {
      getChatMessagesHandler();
    }
  }, [selectedChat?._id, userDetails?.id]);

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
