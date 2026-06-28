import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ConnectHub Backend is Running 🚀",
  });
});

export default app;