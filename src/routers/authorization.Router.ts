import { Router } from "express";
import { verifyRefreshToken, verifyToken } from "../middleware/auth.middleware";
import { dummy } from "../services/dummyService";

export const authorRouter = Router();

authorRouter.get("/verifytoken",verifyToken)

authorRouter.get("/gubt",verifyToken,dummy)

authorRouter.post("/refreshtoken",verifyRefreshToken,dummy)