import { Router } from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.route("/:id").get(verifyToken, getUser);
router.route("/:id/friends").get(verifyToken, getUserFriends);
router.route("/:id/:friendId").patch(verifyToken, addRemoveFriends);

export default router;
