import express from "express"; /*nodejs framework*/
import { login, logout, signup } from "../controllers/auth.controller.js"; /*getting controllers*/

const router = express.Router(); /*new router instance*/

router.post("/signup",signup)
router.post("/login",login) 
router.post("/logout",logout)

export default router;