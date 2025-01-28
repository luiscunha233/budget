"use server";

import { Budget } from "@prisma/client";
import { createBudgetGroup, updateBudgetGroup, deleteBudgetGroup, getBudgetGroupById, getAllBudgetGroups, getBudgetsInBudgetGroup, getBudgetOfBudgetGroupByMonth } from "../db/BudgetGroup";
import { getBudgetBalance } from "./BudgetService";

export async function createBudgetGroupService(name: string, type: string) {
    return await createBudgetGroup(name, type);
}

export async function updateBudgetGroupService(id: string, name: string, type: string) {
    return await updateBudgetGroup(id, name, type);
}

export async function deleteBudgetGroupService(id: string) {
    return await deleteBudgetGroup(id);
}

export async function getBudgetGroupService(id: string) {
    return await getBudgetGroupById(id);
}

export async function getAllBudgetGroupsService() {
    return await getAllBudgetGroups();
}

export async function getBudgetsInBudgetGroupService(id: string) {
    const budgetGroup = await getBudgetGroupById(id);
    if (budgetGroup) {
        return await getBudgetsInBudgetGroup(id);
    } else {
        return [];
    }
}

export async function calculateTotalForBudgetGroupsInMonth(year: number, month: number): Promise<BudgetGroupTotals> {
    const budgetGroups = await getBudgetGroupsInMonthService(year, month);
    let totalSpent = 0;
    let totalGoal = 0;

    for (const budgetGroup of budgetGroups) {
        const budgets = await getBudgetsInBudgetGroup(budgetGroup.id);
        const { totalSpent: groupTotalSpent, totalGoal: groupTotalGoal } = await calculateBudgetGroupTotals(budgets);
        totalSpent += groupTotalSpent;
        totalGoal += groupTotalGoal;
    }

    return { totalSpent, totalGoal };
}


export async function getBudgetGroupsInMonthService(year: number, month: number) {
    const allBudgetGroups = await getAllBudgetGroupsService();
    
    const budgetsGroups = [];

    for (const budgetGroup of allBudgetGroups) {
        const budgets = await getBudgetOfBudgetGroupByMonth(budgetGroup.id, year, month);
        if (budgets.length > 0) {
            budgetsGroups.push(budgetGroup);
        }
    }
    return budgetsGroups;
}


export interface BudgetGroupTotals {
    totalSpent: number;
    totalGoal: number;
}

export async function calculateBudgetGroupTotals(budgets: Budget[]): Promise<BudgetGroupTotals> {
    ;
    let totalSpent = 0;
    let totalGoal = 0;

    for (const budget of budgets) {
        totalSpent += await getBudgetBalance(budget.id) ?? 0;
        totalGoal += budget.goal;
    }

    return { totalSpent, totalGoal };
}