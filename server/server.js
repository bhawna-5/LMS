import express from "express";
// import cors from "cors";
import "dotenv/config";
// import connectDb from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import connectDb from "./configs/mongodb.js";

//initialize express
const app = express();
 
//middlewares
// app.use(cors());
//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
// app.post("/clerk", express.json(), clerkWebhooks );
const PORT = process.env.PORT || 5000;

connectDb()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    })
  )
  .catch((error) => {
    console.error("Database connection failed. Server not started.");
    console.log(error);
  });
