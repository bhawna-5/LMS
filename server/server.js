import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import connectDb from "./configs/mongodb.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";

import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoutes.js";

//initialize express
const app = express();

await connectCloudinary();
//middlewares
app.use(cors());
app.use(clerkMiddleware());
//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);
app.post("/stripe", express.raw({ type: "application/json" }),stripeWebhooks);
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

/*{"courseTitle":"test course title",
"courseDescription:"test course description",
"coursePrice":50,
"discount":10,
"courseContent":[
{"chapterId":"ch01",
"chapterOrder:1,
"chapterTitle":"test chapter title",
"chapterContent":[
{ "lectureId:"lec01",
"lectureTitle":"test lecture title",
"lectureDuration":20,
"lectureUrl":"https://example.com/lecture/lec01.mp4",
"isPreviewFree":true,
"lectureOrder"1
}
]
}
]
}*/
