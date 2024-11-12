"use server"

import prisma from "@/db/db";
import { BudgetGroup } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createBudgetGroup(name: string, type: string) {
    const result = await prisma.budgetGroup.create({data: {name: name, type: type}});
    revalidatePath("/budget",'layout');
    return result;
}

export async function getAllBudgetGroups() {
    return await prisma.budgetGroup.findMany({include: {budgets: true}});
}

