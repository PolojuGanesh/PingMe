import { io } from "socket.io-client";

const socket = io("https://pingme-backend-fmyo.onrender.com", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
