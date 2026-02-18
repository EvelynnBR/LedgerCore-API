import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { authConfig } from "@/config/auth"
import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"
import { z } from "zod"

class SessionController {
  async session(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = bodySchema.parse(req.body)

    const user = await prisma.user.findFirst({
      where: { email },
    })

    if (!user) {
      throw new AppError("E-mail ou senha incorreto!")
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha incorreto!")
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role, email: user.email }, secret, {
      subject: user.id,
      expiresIn,
    })

    const { password: _, ...userWithoutPassword } = user

    return res.status(201).json({ token, userWithoutPassword })
  }
}

export { SessionController }
