import { Router } from "express"
import { login, restrictedDashboard } from "../controllers/agent.controller.js"

const router = Router()

router.get("/SignIn", login)
router.get("/dashboard", restrictedDashboard)

export default router