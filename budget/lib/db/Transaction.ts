import prisma from "@/lib/db/prisma";
import { getAccountBalance } from "./Accounts";

export async function createTransaction(name: string, value: number, date: Date, accountid: string, budgetId?: string | null) {
    return await prisma.$transaction(async (tx) => {
        let latestTransaction = await tx.transaction.findFirst({ where: { accountid: accountid }, orderBy: { date: 'desc' } });
        let balance = (latestTransaction?.balance || 0) + value;
        let newTransaction = await tx.transaction.create({ data: { name, value, date, accountid, budgetId, balance } });

        return newTransaction;
    });
}

export async function getTransactionById(id: string) {
    let transaction = await prisma.transaction.findUnique({ where: { id } });
    return transaction;
}

export async function getTransactions(startDate: Date, endDate: Date) {
    let transactions = await prisma.transaction.findMany({
        where: {
            date: {
                gt: startDate,
                lte: endDate,
            },
        },
    });
    return transactions;
}

export async function getLatestTransaction(accountId: string) {
    let transaction = await prisma.transaction.findFirst({ where: { accountid: accountId }, orderBy: { date: 'desc' } });
    return transaction;
}

