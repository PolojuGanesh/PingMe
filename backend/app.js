import express from "express";
import cors from "cors";
import userRoutes from "./routes/route.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

export default app;
