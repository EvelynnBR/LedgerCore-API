import { Router } from "express"
import { TransactionController } from "@/controllers/transactionController"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const transactionRoute = Router()
const transactionController = new TransactionController()

transactionRoute.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["client"]),
  transactionController.transaction,
)

export { transactionRoute }