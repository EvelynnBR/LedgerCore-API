import { ErrorRequestHandler } from "express"
import { AppError } from "@/utils/AppError"
import { ZodError } from "zod"

const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message })

    return
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      message: "validation error",
      issues: error.format(),
    })

    return
  }

  return res.status(500).json({ message: error.message })
}

export { errorHandling }
