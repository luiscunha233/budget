import prisma from "@/lib/db/prisma";

export async function createInvestment(symbol: string, amount: number) {
    let newInvestment = await prisma.investment.create({ data: { symbol, amount } });
    return newInvestment;
}

export async function updateInvestment(id: string, symbol: string, amount: number) {
    let updatedInvestment = await prisma.investment.update({ where: { id }, data: { symbol, amount } });
    return updatedInvestment;
}

export async function deleteInvestment(id: string) {
    let deletedInvestment = await prisma.investment.delete({ where: { id } });
    return deletedInvestment;
}

export async function getAllInvestments() {
    let investments = await prisma.investment.findMany();
    return investments;
}