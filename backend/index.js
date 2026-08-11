import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/database.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { Socket } from "dgram";

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
  console.log(socket.id);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { io };
