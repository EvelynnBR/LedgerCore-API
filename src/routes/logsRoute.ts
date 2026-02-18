import { Router } from "express"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"
import { LogsController } from "@/controllers/LogsController"

const logsRoute = Router()
const logsController = new LogsController()

logsRoute.get("/", ensureAuthenticated, verifyUserAuthorization(["manager", "client"]), logsController.logs)

export { logsRoute }