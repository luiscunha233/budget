import { createAccount } from "../db/Accounts";
import { createBudget } from "../db/Budget";
import { createBudgetGroup } from "../db/BudgetGroup";
import { createInvestment } from "../db/Investment";
import { createTransaction } from "./TransactionService";

export async function populateDatabase() {
    const familyBudgetGroup = await createBudgetGroup("Family Budget", "family");
    const groceriesBudget = await createBudget("Groceries", new Date("2025-01-01"), new Date("2025-01-31"), 500, familyBudgetGroup.id);
    const rentBudget = await createBudget("Rent", new Date("2025-01-01"), new Date("2025-01-31"), 1000, familyBudgetGroup.id);
    const entertainmentBudget = await createBudget("Entertainment", new Date("2025-01-01"), new Date("2025-01-31"), 200, familyBudgetGroup.id);

    const savingsAccount = await createAccount("Savings", "savings");
    const checkingAccount = await createAccount("Checking", "checking");

    await createTransaction("Grocery Shopping January", 250, new Date("2025-01-15"), savingsAccount.id, groceriesBudget.id);
    await createTransaction("Rent Payment January", 1000, new Date("2025-01-01"), checkingAccount.id, rentBudget.id);
    await createTransaction("Cinema", 50, new Date("2025-01-01"), checkingAccount.id, entertainmentBudget.id);

}