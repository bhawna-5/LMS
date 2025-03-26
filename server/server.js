import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// Connect to the database (make sure this runs only once)
await connectDb();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/clerk", clerkWebhooks);

// ✅ Instead of app.listen(), export default app
export default app;
