import { useState } from "react";

import SideNavbar from "../SideNavbar";
import Chats from "../Chats";
import Viewer from "../Viewer";

const MainHome = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Mobile */}
      <div className="flex flex-1 md:hidden">
        {!selectedChat ? (
          <>
            <SideNavbar />
            <Chats setSelectedChat={setSelectedChat} />
          </>
        ) : (
          <Viewer
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        )}
      </div>

      {/* Tablet & Desktop */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <SideNavbar />
        <Chats selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        <Viewer selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
      </div>
    </div>
  );
};

export default MainHome;
