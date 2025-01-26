"use server";

import { createAccount, updateAccount, deleteAccount, getAllAccounts, getAccountById, updateBalance, getAllAccountTransaction } from "@/lib/db/Accounts";
import { getTransactions } from "../db/Accounts";
import { calculateBalance } from "./SyncUtilities";

export async function createAccountService(name: string, type: string) {
    return await createAccount(name, type);
}

export async function updateAccountService(id: string, name: string, type: string, currentBalance: number) {
    return await updateAccount(id, name, type, currentBalance);
}

export async function deleteAccountService(id: string) {
    return await deleteAccount(id);
}

export async function recalculateBalance(accountId: string) {
    let account = await getAccountById(accountId);

    if (account) {

        let transactions = await getTransactions(account.id, account.balanceDate, new Date());

        if (transactions.length > 0) {
            updateBalance(account.id, calculateBalance(transactions));
        }
    }
}

export async function forceRecalculateBalance(accountId: string) {
    let account = await getAccountById(accountId);

    if (account) {

        let transactions = await getAllAccountTransaction(account.id) ?? [];

        if (transactions.length > 0) {
            updateBalance(account.id, calculateBalance(transactions));
        }
    }
}

export async function getAllAccountsService() {
    return await getAllAccounts();
}