import { Request, Response } from "express";
import { prisma } from "../db";

//get balance
export const getBalance = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    const account = await prisma.account.findUnique({
      where: {
        userId,
      },
      select: { balance: true },
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.json({ balance: account.balance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//post transfer
export const transferMoney = async (req: Request, res: Response) => {
  try {
    const senderId = req.userId!;
    const { toUserId, amount } = req.body;

    if (!toUserId || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid transfer request" });
    }

    const result = await prisma.$transaction(async (tx) => {
      //check sender balance
      const senderAccount = await tx.account.findUnique({
        where: { userId: senderId },
      });

      if (!senderAccount || senderAccount.balance < amount) {
        throw new Error("Insufficient balance");
      }

      //ensure receiver exists
      const receiverAccount = await tx.account.findUnique({
        where: { id: toUserId },
      });

      if (!receiverAccount) {
        throw new Error("Receiver account not found");
      }

      //debit sender
      await tx.account.update({
        where: { userId: senderId },
        data: { balance: { decrement: amount } },
      });

      await tx.account.update({
        where: { userId: toUserId },
        data: { balance: { increment: amount } },
      });

      return { success: true };
    });

    return res.json({ message: "Transfer successfull", result });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ message: err.message || "Transfer failed" });
  }
};
