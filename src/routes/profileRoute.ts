import { Router } from "express"
import { ProfileController } from "@/controllers/profileController"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const profileRoute = Router()
const profileController = new ProfileController()

profileRoute.get("/", ensureAuthenticated, verifyUserAuthorization(["manager", "client"]), profileController.index)

export { profileRoute }
