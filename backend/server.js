import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import focusRoutes from "./routes/focus.js";
dotenv.config();

// Main server file: sets up Express app, middleware, and routes
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/focus", focusRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
