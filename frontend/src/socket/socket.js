import { io } from "socket.io-client";

const socket = io("https://pingme-backend-fmyo.onrender.com", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;

// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000", {
//   autoConnect: false,
//   withCredentials: true,
// });

// export default socket;
