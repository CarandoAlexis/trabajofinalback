import { Router } from "express";
import sessionController from "../controllers/session.controller.js";
import authMdw from "../middleware/auth.middleware.js";
// import passport from "passport";


const router = Router();

router.post("/register", sessionController.register);

router.post("/login", sessionController.login);

/*
router.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    if (req.authMdw()) {
      const { user } = req;

      req.session.user = {
        id: user._id,
        email: user.email,
      };
      res.redirect("/current");
    } else {
      res.status(401).json({ message: "Autenticación fallida" });
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ status: "error", message: "Error en el inicio de sesión" });
  }
});
*/

router.get("/logout", sessionController.logout);

router.get("/github", sessionController.githubAuthentication);

router.get("/github/callback", sessionController.githubAuthenticationCallback);

router.get("/current", authMdw , sessionController.getCurrentUserDTO);

export default router;


