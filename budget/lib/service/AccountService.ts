"use server";

import { createAccount, updateAccount, deleteAccount, getAllAccounts } from "@/lib/db/Accounts";


export async function createAccountService(name: string, type: string, icon: string) {
    return await createAccount(name, type, icon);
}

export async function updateAccountService(id: string, name: string, type: string, currentBalance: number) {
    return await updateAccount(id, name, type);
}

export async function deleteAccountService(id: string) {
    return await deleteAccount(id);
}

export async function getAllAccountsService() {
    return await getAllAccounts();
}

export async function getAccountBalance(accountId: string) {
    return await getAccountBalance(accountId);
}