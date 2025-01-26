import prisma from "@/lib/db/prisma";
import { addMonth, parse } from "ts-date/locale/en";

export async function createBudgetGroup(name: string, type: string) {
    let newBudgetGroup = await prisma.budgetGroup.create({ data: { name, type } });
    return newBudgetGroup;
}

export async function updateBudgetGroup(id: string, name: string, type: string) {
    let updatedBudgetGroup = await prisma.budgetGroup.update({ where: { id }, data: { name, type } });
    return updatedBudgetGroup;
}

export async function deleteBudgetGroup(id: string) {
    let deletedBudgetGroup = await prisma.budgetGroup.delete({ where: { id } });
    return deletedBudgetGroup;
}

export async function getAllBudgetGroups() {
    let budgetGroups = await prisma.budgetGroup.findMany();
    return budgetGroups;
}

export async function getBudgetGroupById(id: string) {
    let budgetGroup = await prisma.budgetGroup.findUnique({ where: { id } });
    return budgetGroup;
}


export async function getTotalBudgetExpectedValue(budgetGroupId: string) {
    let budgets = await prisma.budget.findMany({
        where: {
            budgetGroupId,
        },
    });

    let totalExpectedValue = 0;
    for (const budget of budgets) {
        totalExpectedValue += budget.goal;
    }

    return totalExpectedValue;
}

export async function getBudgetsInBudgetGroup(budgetGroupId: string) {
    const budgets = await prisma.budget.findMany({
        where: {
            budgetGroupId,
        },
    });
    return budgets;

}

export async function getBudgetOfBudgetGroupByMonth(budgetGroupId: string, year: number, month: number) {
    const targetStartDate = new Date(year, month - 1, 1);
    const targetEndDate = addMonth(targetStartDate, 1);

    if (targetStartDate && targetEndDate) {
        const budgets = await prisma.budget.findMany({
            where: {
                budgetGroupId,
                startDate: {
                    gte: targetStartDate,
                    lt: targetEndDate,
                },
            },
        });
        return budgets;
    }
    return [];
}


