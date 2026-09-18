import { useState, useContext } from "react";
import { Context } from "../context/Context";

import SideNavbar from "../SideNavbar";
import Chats from "../Chats";
import Viewer from "../Viewer";

const MainHome = () => {
  const { selectedChat } = useContext(Context);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Mobile */}
      <div className="flex flex-1 md:hidden">
        {!selectedChat ? (
          <>
            <SideNavbar />
            <Chats />
          </>
        ) : (
          <Viewer />
        )}
      </div>

      {/* Tablet & Desktop */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <SideNavbar />
        <Chats />
        <Viewer />
      </div>
    </div>
  );
};

export default MainHome;
