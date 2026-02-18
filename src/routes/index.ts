import { Router } from "express"
import { userRoute } from "./userRoute"
import { sessionRoute } from "./sessionRoute"
import { profileRoute } from "./profileRoute"
import { transactionRoute } from "./transactionRoute"
import { logsRoute } from "./logsRoute"

const routes = Router()

routes.use("/user", userRoute)
routes.use("/session", sessionRoute)
routes.use("/profile", profileRoute)
routes.use("/transaction", transactionRoute)
routes.use("/logs", logsRoute)

export { routes }