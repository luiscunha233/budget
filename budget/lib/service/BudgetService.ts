"use server";

import { createBudget, deleteBudget, getBudgetById, updateBudget } from "../db/Budget";
import { calculateBalance } from "./SyncUtilities";

export async function getBudgetBalance(id: string) {
    let budget = await getBudgetById(id);
    if (budget?.Transactions && budget.Transactions.length > 0) {
        return calculateBalance(budget.Transactions);
    }
}

export async function createBudgetService(name: string, startDate: Date, endDate: Date, goal: number, budgetGroupId: string) {
    return await createBudget(name, startDate, endDate, goal, budgetGroupId);
}

export async function updateBudgetService(id: string, name: string, startDate: Date, endDate: Date, goal: number, budgetGroupId?: string) {
    return await updateBudget(id, name, startDate, endDate, goal, budgetGroupId);
}

export async function deleteBudgetService(id: string) {
    return await deleteBudget(id);
}

export async function getBudgetService(id: string) {
    return await getBudgetById(id);
}
