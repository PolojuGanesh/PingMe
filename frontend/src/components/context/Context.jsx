import { children, createContext, useState, useEffect } from "react";
import Cookies from "js-cookies";
import socket from "../../socket/socket";

export const Context = createContext(null);

const ContextProvider = (props) => {
  const [jwtToken, setJwtToken] = useState(
    Cookies.getItem("jwt_token") || null,
  );

  const [userDetails, setUserDetails] = useState(
    JSON.parse(Cookies.getItem("user")) || null,
  );

  const [openProfile, setOpenProfile] = useState(false);

  const apiUrl = "http://localhost:3000/api";

  const contextValue = {
    apiUrl,
    jwtToken,
    setJwtToken,
    userDetails,
    setUserDetails,
    openProfile,
    setOpenProfile,
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
