import { children, createContext, useState, useEffect } from "react";
import Cookies from "js-cookies";
import socket from "../../socket/socket";
import { toast } from "react-toastify";

export const Context = createContext(null);

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
  { id: 13, message: "See you tomorrow.", time: "11:25 AM", isSent: true },
  { id: 14, message: "Good night!", time: "11:30 AM", isSent: false },
  { id: 15, message: "Take care of yourself.", time: "11:35 AM", isSent: true },
  { id: 16, message: "Have a good one!", time: "11:40 AM", isSent: false },
  { id: 17, message: "See you later.", time: "11:45 AM", isSent: true },
  { id: 18, message: "Stay in touch.", time: "11:50 AM", isSent: false },
  { id: 19, message: "Catch you later.", time: "11:55 AM", isSent: true },
  { id: 20, message: "Take care!", time: "12:00 PM", isSent: false },
  {
    id: 21,
    message:
      "Goodbye for now The World Wide Web is often categorised into three generations: Web 1.0, Web 2.0, and Web 3.0 (or Web3).[5] It was invented in 1989, and released to the public in 1993.[6] In the early years of the web, retrospectively referred to as Web 1.0, websites were simply a collection of static HTML files, and had limited interactivity.[7] After the introduction of JavaScript in 1995,[8] websites could contain logic, allowing for interactivity.[9] The following year CSS was released,[10] allowing greater control over the styling of web pages.[9]In 1999, the term Web 2.0 was coined by Darcy DiNucci.[11] The term later resurfaced in the early 2000s,[12] as websites started to increase in complexity, requiring server-side services in addition to JavaScript. This led to the emergence of various new programming languages and frameworks designed for backend services, such as PHP, Active Server Pages, and Jakarta Server Pages. This enabled websites to do additional server-side processing, such as accessing databases.[9][13]Another shift in web development was the release of the iPhone in 2007. This created a new medium for accessing the web, requiring a new approach to web development, and resulting in responsive web design,[14] which allows a single website to appear different depending on the device running it.[15] Later, progressive web apps were introduced, allowing websites to be installed on a device as an independent application.[16]In the 2010s, JavaScript frameworks began to emerge, creating new ways to manipulate web pages, and increasing compatibility between web browsers.[14] JQuery was popular in the early 2010s, but was later surpassed by other frameworks such as React and Vue.js.[17]In the mid 2020s, use of AI became prevalent among web developers, with the 2025 Stack Overflow survey showing over 80% of developers saying they use AI at least monthly in their development process.[18][19].",
    time: "12:05 PM",
    isSent: true,
  },
  {
    id: 22,
    message:
      "Goodbye for now The World Wide Web is often categorised into three generations: Web 1.0, Web 2.0, and Web 3.0 (or Web3).[5] It was invented in 1989, and released to the public in 1993.[6] In the early years of the web, retrospectively referred to as Web 1.0, websites were simply a collection of static HTML files, and had limited interactivity.[7] After the introduction of JavaScript in 1995,[8] websites could contain logic, allowing for interactivity.[9] The following year CSS was released,[10] allowing greater control over the styling of web pages.[9]In 1999, the term Web 2.0 was coined by Darcy DiNucci.[11] The term later resurfaced in the early 2000s,[12] as websites started to increase in complexity, requiring server-side services in addition to JavaScript. This led to the emergence of various new programming languages and frameworks designed for backend services, such as PHP, Active Server Pages, and Jakarta Server Pages. This enabled websites to do additional server-side processing, such as accessing databases.[9][13]Another shift in web development was the release of the iPhone in 2007. This created a new medium for accessing the web, requiring a new approach to web development, and resulting in responsive web design,[14] which allows a single website to appear different depending on the device running it.[15] Later, progressive web apps were introduced, allowing websites to be installed on a device as an independent application.[16]In the 2010s, JavaScript frameworks began to emerge, creating new ways to manipulate web pages, and increasing compatibility between web browsers.[14] JQuery was popular in the early 2010s, but was later surpassed by other frameworks such as React and Vue.js.[17]In the mid 2020s, use of AI became prevalent among web developers, with the 2025 Stack Overflow survey showing over 80% of developers saying they use AI at least monthly in their development process.[18][19].",
    time: "12:05 PM",
    isSent: false,
  },
];

const ContextProvider = (props) => {
  const [jwtToken, setJwtToken] = useState(
    Cookies.getItem("jwt_token") || null,
  );

  const [userDetails, setUserDetails] = useState(
    JSON.parse(Cookies.getItem("user")) || null,
  );

  const [selectedChat, setSelectedChat] = useState(null);

  const [openProfile, setOpenProfile] = useState(false);
  const [openChatSetting, setOpenChatSetting] = useState(false);

  const [chatMessages, setChatMessages] = useState(chatMessagesData);

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

  console.log("All Contacts Data:", allContacts);

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
  };

  useEffect(() => {
    const handleConnect = () => {
      console.log(`Socket connected: ${socket.id}`);
    };

    if (jwtToken) {
      socket.auth = { token: jwtToken };

      socket.on("connect", handleConnect);
      socket.connect();
    } else {
      socket.disconnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.disconnect();
    };
  }, [jwtToken]);

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
