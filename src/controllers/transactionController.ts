import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { Prisma } from "@prisma/client"

class TransactionController {
  async transaction(req: Request, res: Response) {
    const userTokenId = req.user?.id

    if (!userTokenId) {
      throw new AppError("Usuário não autorizado!", 401)
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userTokenId,
      },
    })

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const bodySchema = z.object({
      id: z.string().uuid({ message: "O Id da conta inválido" }),
      description: z.string().trim().min(1).optional().default("Valor enviado com sucesso"),
      value: z.number().positive(),
    })
    const {
      id: accountId,
      description,
      value: valueTransaction,
    } = bodySchema.parse(req.body)

    const accountDestination = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
    })

    if (!accountDestination) {
      throw new AppError("Conta bancária de destino não existe")
    }

    const userHistory = await prisma.user.findUnique({
      where: { id: userTokenId },
      select: {
        userAccount: {
          select: {
            id: true,
          },
        },
      },
    })

    await prisma.$transaction(async (tx) => {
      const senderUpdate = await tx.account.updateMany({
        where: {
          userId: userTokenId,
          id: { not: accountId },
          balance: {
            gte: new Prisma.Decimal(valueTransaction),
          },
        },
        data: {
          balance: {
            decrement: new Prisma.Decimal(valueTransaction),
          },
        },
      })

      if (senderUpdate.count === 0) {
        throw new AppError("Saldo insuficiente!")
      }

      if (!userHistory || !userHistory.userAccount) {
        throw new AppError("Conta não encontrada para histórico")
      }

      await tx.history.create({
        data: {
          accountId: userHistory.userAccount.id,
          description: description,
          transactionValue: new Prisma.Decimal(valueTransaction),
        },
      })

      await tx.account.update({
        where: {
          id: accountId,
        },
        data: {
          balance: {
            increment: new Prisma.Decimal(valueTransaction),
          },
          history: {
            create: {
              description: `Valor recebido de ${user.name}`,
              transactionValue: valueTransaction,
            },
          },
        },
      })
    })

    const comprovante = {
      from: await prisma.user.findUnique({
        where: { id: userTokenId },
        select: {
          name: true,
        },
      }),
      to: await prisma.account.findUnique({
        where: { id: accountId },
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      }),
    }

    return res.status(201).json({ comprovante, valueTransaction })
  }
}

export { TransactionController }
