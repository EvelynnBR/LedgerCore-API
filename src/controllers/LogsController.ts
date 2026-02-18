import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

class LogsController {
  async logs(req: Request, res: Response) {
    const userTokenId = req.user?.id
    const userTokenRole = req.user?.role

    if (!userTokenId) {
      throw new AppError("Id de usuário não encontrado no token", 401)
    }

    if (userTokenRole !== "manager" && !userTokenId) {
      throw new AppError("Usuário não autorizado", 401)
    }

    const logs = await prisma.user.findUnique({
      where: {
        id: userTokenId,
      },
      select: {
        name: true,
        userAccount: {
          select: {
            balance: true,
            history: true,
          },
        },
      },
    })

    return res.json({ logs })
  }
}

export { LogsController }
