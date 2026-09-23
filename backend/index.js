import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/database.js";
import { Server } from "socket.io";
import { createServer } from "http";
import Message from "./models/Messages.js";

// connect to database
connectDB();

const PORT = process.env.PORT || 3001;

// creating http server
const server = createServer(app);

// initialize socket io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log(socket.id);

  // Handler user joining a room
  socket.on("join_user", (userId) => {
    socket.join(userId);
    socket.userId = userId;
    // console.log(`User with ID ${userId} joined`);
  });

  // send one to one message
  socket.on("send_message", async (data) => {
    try {
      const { senderId, receiverId, text } = data;
      // console.log("Message:", data);

      // Save message to the database
      const newMessage = await Message.create({
        senderId,
        receiverId,
        text,
      });

      // send to receiver
      io.to(receiverId).emit("receive_message", newMessage);

      // send back to sender also
      io.to(senderId).emit("receive_message", newMessage);
    } catch (error) {
      console.log("Send message error:", error);
    }
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { io };
