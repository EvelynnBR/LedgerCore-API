import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "@/utils/AppError"
import { authConfig } from "@/config/auth"

interface TokenPayload {
  role: string
  sub: string
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new AppError("JWT não encontrado", 401)
    }

    const [, token] = authHeader.split(" ")

    const {role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayload

    req.user = {
      id: user_id,
      role,
    }

    return next()
  } catch (error) {
    throw new AppError("token JWT inválido", 401)
  }
}
