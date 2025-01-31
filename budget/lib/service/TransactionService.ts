"use server";

import * as prisma from "@prisma/client";
import * as Transaction from "@/lib/db/Transaction";
import { revalidatePath } from "next/cache";


export async function createTransaction(name: string, value: number, date: Date, accountid: string, budgetId?: string | null, revalidate?: string) {
  let newTransaction = await Transaction.createTransaction(name, value, date, accountid, budgetId);
  if (newTransaction) {
    if (revalidate) {
      revalidatePath(revalidate, "page");
    }
    return newTransaction;
  }
}


export async function deleteTransaction(id: string, revalidate?: string) {
  const transaction = await Transaction.getTransactionById(id);
  let deletedTransaction = null;
  if (transaction) {
    deletedTransaction = await Transaction.createTransaction(transaction.name, transaction.value, transaction.date, transaction.accountid, transaction.budgetId);
  }
  if (revalidate) {
    revalidatePath(revalidate, "page");
  }

  return deletedTransaction;
}

export async function getTransactions(startDate: Date, endDate: Date) {
  return await Transaction.getTransactions(startDate, endDate);
}







