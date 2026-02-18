import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { hash } from "bcrypt"
import { AppError } from "@/utils/AppError"

class UserController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      username: z.string().min(2, {
        message: "Nome de usuário deve conter pelo menos 3 caracteres!",
      }),
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: "A senha deve conter pelo menos 6 caracteres!" }),
    })

    const { username, email, password } = bodySchema.parse(req.body)

    const existsEmail = await prisma.user.findFirst({
      where: { email },
    })

    if (existsEmail) {
      throw new AppError("Usuário já cadastrado!")
    }

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
        userAccount: {
          create: {
            balance: 10000
          },
        },
      },
    })

    const { password: _, ...userWithoutPassword } = user

    res.send({ userWithoutPassword })
  }
}

export { UserController }
