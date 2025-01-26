"use server";

import { Budget } from "@prisma/client";
import { createBudgetGroup, updateBudgetGroup, deleteBudgetGroup, getBudgetGroupById, getAllBudgetGroups, getBudgetsInBudgetGroup } from "../db/BudgetGroup";
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



export interface BudgetGroupTotals {
    totalSpent: number;
    totalGoal: number;
}

export async function calculateBudgetGroupTotals(budgets: Budget[]): Promise<BudgetGroupTotals> {;
    let totalSpent = 0;
    let totalGoal = 0;

    for (const budget of budgets) {
        totalSpent += await getBudgetBalance(budget.id) ?? 0;
        totalGoal += budget.goal;
    }

    return { totalSpent, totalGoal };
}