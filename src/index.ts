import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import { v2 as cloudinary } from "cloudinary";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(cors());

// health check of the server
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health ok!" });
});

// user api
app.use("/api/my/user", myUserRoute);

// restaurant api
app.use("/api/my/restaurant", myRestaurantRoute);

// restaurant search
app.use("/api/restaurant", restaurantRoute);

app.listen(4000, () => {
  console.log("Server started on localhost: 4000");
});
