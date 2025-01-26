"use server"

import { getAccountById, getAllAccounts, getAllAccountTransaction } from "@/lib/db/Accounts";
import { forceRecalculateBalance, recalculateBalance } from "@/lib/service/AccountService";
import { getBudgetBalance } from "@/lib/service/BudgetService";


export async function test() {
        // Create Budget Groups
        forceRecalculateBalance("679579e67d16d59f14f4dfeb");
        return [ await getBudgetBalance("679579ee7d16d59f14f4e012")];
}