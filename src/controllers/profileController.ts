import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

class ProfileController {
  async index(req: Request, res: Response) {
    const userTokenId = req.user?.id
    const userTokenRole = req.user?.role

    if (!userTokenId) {
      throw new AppError("ID de usuário não encontrado no token", 401)
    }

    if (userTokenRole !== "manager" && !userTokenId) {
      throw new AppError("Usuário não autorizado", 401)
    }

    const listData = await prisma.user.findMany({
      where: {
        id: userTokenId,
      },
      select: {
        name: true,
        email: true,
        role: true,
        userAccount: {
          select: {
            balance: true,
          },
        },
      },
    })

    const formattedData = listData.map((user) => ({
      ...user,
      userAccount: user.userAccount && {
        ...user.userAccount,
        balance: user.userAccount.balance.toString(),
      },
    }))

    return res.json({ listData: formattedData })
  }
}

export { ProfileController }
