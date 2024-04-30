import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database"));

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// health check of the server
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health ok!" });
});

// user api
app.use("/api/my/user", myUserRoute);

app.listen(port, () => {
  console.log("Server started on localhost: 4000");
});
