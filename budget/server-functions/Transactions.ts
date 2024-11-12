"use server"

import prisma from "@/db/db";
import { Budget } from "@prisma/client";

export async function getBudgetTransactions(budget:Budget) {
    return await prisma.transactions.findMany({where: {budgetId: budget.id}});
}