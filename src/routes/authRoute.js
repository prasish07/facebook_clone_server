import { Router } from "express";
import upload from "../helper/upload.js";
import { signup, login } from "../controller/auth.js";

const router = Router();

router.post("/auth/register", upload.single("picture"), signup);

router.post("/auth/login", login);

export default router;
