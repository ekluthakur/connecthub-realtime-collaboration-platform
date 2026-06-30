import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import path from "path";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());

app.use(express.json());
app.use(
  "/uploads",
  express.static(path.resolve("src/uploads"))
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);


// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ConnectHub Backend is Running 🚀",
  });
});

export default app;