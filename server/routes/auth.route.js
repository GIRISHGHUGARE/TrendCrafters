import express from "express"; /*nodejs framework*/
import { getCurrentUser, login, logout, signup } from "../controllers/auth.controller.js"; /*getting controllers*/
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router(); /*new router instance*/

router.post("/signup",signup)
router.post("/login",login) 
router.post("/logout",logout)
router.get("/me", protectRoute, getCurrentUser);

export default router;