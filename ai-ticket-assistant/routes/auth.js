import express from "express";
import { validateToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/validate", validateToken);

export default router;
