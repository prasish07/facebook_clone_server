import { Router } from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controller/post.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.route("/").get(verifyToken, getFeedPosts);
router.route("/:userId/posts").get(verifyToken, getUserPosts);

router.route("/:postId/like").patch(verifyToken, likePost);

export default router;
