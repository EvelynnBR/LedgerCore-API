import { Router } from "express"

import { SessionController } from "@/controllers/sessionController"

const sessionRoute = Router()
const sessionController = new SessionController()

sessionRoute.post("/", sessionController.session)

export { sessionRoute }