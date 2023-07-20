import { Router } from "express";
import upload from "../helper/upload";
import { signup, login } from "../controller/auth";

const router = Router();

router.post("/auth/register", upload.single("picture"), signup);

router.post("/auth/login", login);

export default router;
