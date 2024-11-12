"use server"

import prisma from "@/db/db";

export async function createBudgetGroup(name: string, type: string) {
    await prisma.budgetGroup.create({data: {name: name, type: type}});
    return await getAllBudgetGroups();
}

export async function getAllBudgetGroups() {
    return await prisma.budgetGroup.findMany({include: {budgets: true}});
}

