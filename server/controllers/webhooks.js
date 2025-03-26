import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = req.body;

    if (type === "user.created") {
      const userData = new User({
        _id: data.id,
        name: data.first_name + " " + data.last_name,
        email: data.email_addresses[0].email_address,
        imageUrl: data.imageUrl,
      });
      await User.create(userData);
      res.json({});
    } else if (type === "user.updated") {
      const userData = {
        name: data.first_name + " " + data.last_name,
        email: data.email_address[0].email_address,
        imageUrl: data.imageUrl,
      };
      await User.findByIdAndUpdate(data.id, userData);
      res.json({});
    } else if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      res.json({})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"error"});
  }
};
