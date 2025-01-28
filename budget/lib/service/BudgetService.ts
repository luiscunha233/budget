"use server";

import { revalidatePath } from "next/cache";
import { createBudget, deleteBudget, getBudgetById, updateBudget } from "../db/Budget";
import { calculateBalance } from "./SyncUtilities";

export async function getBudgetBalance(id: string) {
    let budget = await getBudgetById(id);
    if (budget?.Transactions && budget.Transactions.length > 0) {
        return calculateBalance(budget.Transactions);
    }
}

export async function createBudgetService(name: string, startDate: Date, endDate: Date, goal: number, budgetGroupId: string) {
    const budget = await createBudget(name, startDate, endDate, goal, budgetGroupId);
    if(budget){
        revalidatePath("/budgetGroups","page");
    }
    return budget;
}

export async function updateBudgetService(id: string, name: string, startDate: Date, endDate: Date, goal: number, budgetGroupId?: string) {
    return await updateBudget(id, name, startDate, endDate, goal, budgetGroupId);
}

export async function deleteBudgetService(id: string, path?: string) {
    const deleteReturn =await deleteBudget(id);
    if(path){
        revalidatePath(path,"page");
    }
    return deleteReturn;
}

export async function getBudgetService(id: string) {
    return await getBudgetById(id);
}
