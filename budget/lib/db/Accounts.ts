import prisma from "@/lib/db/prisma";
    

export async function createAccount(name: string, type: string) {
    let newAccount = await prisma.account.create({data: {name, type, currentBalance: 0, creationBalance: 0,balanceDate:new Date()}});
    return newAccount;
}

export async function createAccountWithBalance(name: string, type: string, currentBalance: number) {
    let newAccount = await prisma.account.create({data: {name, type, currentBalance: currentBalance, creationBalance: currentBalance,balanceDate:new Date()}});
    return newAccount;
}

export async function updateAccount(id: string,name: string, type: string, currentBalance: number) {
    let updatedAccount = await prisma.account.update({where: {id}, data: {name, type, currentBalance}});
    return updatedAccount;
}

export async function updateBalance(id: string, newBalance: number) {
    let updatedAccount = await prisma.account.update({where: {id}, data: {currentBalance: newBalance, balanceDate: new Date()}});
    return updatedAccount;
}

export async function deleteAccount(id: string) {
    let deletedAccount = await prisma.account.delete({where: {id: id}});
    return deletedAccount;
}

export async function getTransactions(accountId: string, startDate: Date, endDate: Date) {
    if(!accountId) {
        return [];
    }

    let transactions = await prisma.transaction.findMany({
        where: {
            accountid: accountId,
            dueDate: {
                gte: startDate,
                lte: endDate,
            },
        },
    });
    return transactions;
}

export async function getAccountById(id: string) {
    let account = await prisma.account.findUnique({where: {id}});
    return account;
}

export async function getAccountByName(name: string) {
    let account = await prisma.account.findFirst({
        where: {
            name,
        },
    });
    return account;
}

export async function getLatestAccountTransactions(accountId: string, numberofTransactions: number) {
    const transactions = await prisma.transaction.findMany({
        where: {
            accountid: accountId,
        },
        take: numberofTransactions,
        orderBy: {
            dueDate: 'desc',
        },
    });
    return transactions;
}

export async function getAllAccountTransaction(id: string){
    let account = await prisma.account.findUnique({where: {id},include:{Transactions: true}});
    return account?.Transactions;
}


export async function getAllAccounts() {
    let accounts = await prisma.account.findMany();
    return accounts;
}
