"use server"

import prisma from "@/db/db";

export async function createBudgetGroup(name: string, type: string) {
    prisma.budgetGroup.create({data: {name: name, type: type}});
}