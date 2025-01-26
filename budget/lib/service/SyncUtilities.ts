import { Transaction } from "@prisma/client";

export function calculateBalance(transactions: Transaction[]) {
    let balance = 0;
    for (const transaction of transactions) {
      balance += transaction.value;
    }
    return balance;
  }