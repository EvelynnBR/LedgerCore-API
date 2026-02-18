import { Router } from "express"
import { UserController } from "@/controllers/userController"

const userRoute = Router()
const userController = new UserController()

userRoute.post("/", userController.create)

export { userRoute }