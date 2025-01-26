import prisma from "@/lib/db/prisma";

export async function createTransaction(name: string, value: number, dueDate: Date, accountid: string, budgetId: string) {
    let newTransaction = await prisma.transaction.create({ data: { name, value, dueDate, accountid, budgetId } });

    return newTransaction;
}

export async function updateTransaction(id: string, name: string, value: number, dueDate: Date, accountid: string, budgetId: string) {
    let updatedTransaction = await prisma.transaction.update({ where: { id }, data: { name, value, dueDate, accountid, budgetId } });
    return updatedTransaction;
}

export async function deleteTransaction(id: string) {
    let deletedTransaction = await prisma.transaction.delete({ where: { id } });
    return deletedTransaction;
}

export async function getTransactionById(id: string) {
    let transaction = await prisma.transaction.findUnique({where: {id}});
    return transaction;
  }

export async function getTransactions(startDate: Date, endDate: Date) {
    let transactions = await prisma.transaction.findMany({
        where: {
            dueDate: {
                gt: startDate,
                lte: endDate,
            },
        },
    });
    return transactions;
}

