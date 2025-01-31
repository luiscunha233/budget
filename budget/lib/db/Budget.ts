"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function createBudget(name: string, startDate: Date, endDate: Date, goal: number, budgetGroupId: string) {
    let newBudget = await prisma.budget.create({ data: { name, startDate,endDate, goal, budgetGroupId } });
    return newBudget;
}

export async function updateBudget(id: string, name: string, startDate: Date, endDate: Date, goal: number, budgetGroupId?: string) {
    let updatedBudget = await prisma.budget.update({ where: { id }, data: { name, startDate, endDate, goal, budgetGroupId } });
    return updatedBudget;
}

export async function deleteBudget(id: string) {
    let deletedBudget = await prisma.budget.delete({ where: { id }, });
    return deletedBudget;
}

export async function getBudgetById(id: string) {
    let budget = await prisma.budget.findUnique({
        where: { id },
        include: {
            Transactions: true,
        }
    });
    return budget;
}

export async function getTransactions(budgetId: string, startDate: Date, endDate: Date) {
    let transactions = await prisma.transaction.findMany({
        where: {
            budgetId: budgetId,
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
    });
    return transactions;
}