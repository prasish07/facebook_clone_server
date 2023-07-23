import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoute.js";
import postRoutes from "./routes/postRoute.js";
import userRoutes from "./routes/userRoute.js";
import { createPost } from "./controller/post.controller.js";
import upload from "./helper/upload.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/user.js";
import Post from "./models/post.js";
import { users, posts } from "./data/index.js";

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "39mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "../public/assets")));
console.log(path.join(__dirname, "../public/assets"));
app.use("/api/v1", authRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", upload.single("picture"), verifyToken, createPost);

//File storage

//mongoose setup
const port = 5000 || process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`App is listening in port ${port}`);
      // User.insertMany(users);
      // Post.insertMany(posts);
    });
  })
  .catch((err) => {
    console.log(err);
  });
