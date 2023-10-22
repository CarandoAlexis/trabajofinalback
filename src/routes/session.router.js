import { Router } from "express";
import sessionController from "../controllers/session.controller.js";
import authMdw from "../middleware/auth.middleware.js";


const router = Router();

router.post("/register", sessionController.register);

router.post("/login", sessionController.login);

router.get("/logout", sessionController.logout);

router.get("/github", sessionController.githubAuthentication);

router.get("/github/current", sessionController.getCurrentUserDTO);

router.get("/github/callback", sessionController.githubAuthenticationCallback);

router.get("/current", authMdw, sessionController.getCurrentUserDTO);



export default router;


