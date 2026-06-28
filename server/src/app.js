import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ConnectHub Backend is Running 🚀",
  });
});

export default app;