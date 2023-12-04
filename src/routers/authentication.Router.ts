import { Router } from "express";
import { dummy } from "../services/dummyService";

const authenRouter = Router();

authenRouter.post("/login",dummy)
authenRouter.post("/verify",dummy)
authenRouter.post("/resend",dummy)

authenRouter.post("/slogin",dummy)

authenRouter.post("/logout",dummy)