"use server";

import * as prisma from "@prisma/client";
import * as Transaction from "@/lib/db/Transaction";
import { recalculateBalance } from "./AccountService";


export async function createTransaction(name: string, value: number, dueDate: Date, accountid: string, budgetId: string) {
  let newTransaction = await Transaction.createTransaction(name, value, dueDate, accountid, budgetId);
  if (newTransaction) {
    recalculateBalance(accountid);
    return newTransaction;
  }
}

export async function updateTransaction(id: string, name: string, value: number, dueDate: Date, accountid: string, budgetId: string) {
  let savedTransaction = await Transaction.getTransactionById(id);

  let updatedTransaction = await Transaction.updateTransaction(id, name, value, dueDate, accountid, budgetId);

  if (savedTransaction?.value && value != savedTransaction.value) {
    recalculateBalance(accountid);
  }
  return updatedTransaction;
}

export async function deleteTransaction(id: string) {
  return await Transaction.deleteTransaction(id);
}

export async function getTransactions(startDate: Date, endDate: Date) {
  return await Transaction.getTransactions(startDate, endDate);
}





