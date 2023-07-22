import { Router } from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controller/post.controller";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.route("/").get(verifyToken, getFeedPosts);
router.route("/:userId/posts").get(verifyToken, getUserPosts);

router.route("/:postId/like").patch(verifyToken, likePost);
