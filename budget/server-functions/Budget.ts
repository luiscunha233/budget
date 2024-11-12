'use server'
import prisma from "@/db/db";

export async function createBudget(budgetGroupId: string, name: string, goal: number) {
    return await prisma.budget.create({data: {BudgetGroup : {connect: {id: budgetGroupId}}, name: name, goal: goal, date: new Date().toISOString()}});
}