import { createAccount } from "../db/Accounts";
import { createBudget } from "../db/Budget";
import { createBudgetGroup } from "../db/BudgetGroup";
import { createInvestment } from "../db/Investment";
import { createTransaction } from "./TransactionService";

export async function populateDatabase() {
    const HomeBudgetGroup = await createBudgetGroup("Home Expenses", "Expense");
    const dailyLivingBudgetGroup = await createBudgetGroup("Daily Living", "Expense");
    const entertaimentBudgetGroup = await createBudgetGroup("Entertainment", "Expense");

    const groceriesBudget = await createBudget("Groceries", new Date("2025-01-01"), new Date("2025-01-31"), 350, dailyLivingBudgetGroup.id);
    const rentBudget = await createBudget("Rent", new Date("2025-01-01"), new Date("2025-01-31"), 900, HomeBudgetGroup.id);
    const entertainmentBudget = await createBudget("Fun Money", new Date("2025-01-01"), new Date("2025-01-31"), 200, entertaimentBudgetGroup.id);

    const savingsAccount = await createAccount("Savings", "savings");
    const checkingAccount = await createAccount("Checking", "checking");

    await createTransaction("Grocery Shopping January", 250, new Date("2025-01-15"), savingsAccount.id, groceriesBudget.id);
    await createTransaction("Rent Payment January", 900, new Date("2025-01-01"), checkingAccount.id, rentBudget.id);
    await createTransaction("Cinema", 50, new Date("2025-01-01"), checkingAccount.id, entertainmentBudget.id);

    const utilitiesBudget = await createBudget("Utilities", new Date("2025-01-01"), new Date("2025-01-31"), 150, HomeBudgetGroup.id);
    const diningOutBudget = await createBudget("Dining Out", new Date("2025-01-01"), new Date("2025-01-31"), 120, entertaimentBudgetGroup.id);
    const transportationBudget = await createBudget("Transportation", new Date("2025-01-01"), new Date("2025-01-31"), 100, dailyLivingBudgetGroup.id);
    const healthcareBudget = await createBudget("Healthcare", new Date("2025-01-01"), new Date("2025-01-31"), 200, dailyLivingBudgetGroup.id);

    await createTransaction("Electricity Bill", 100, new Date("2025-01-10"), checkingAccount.id, utilitiesBudget.id);
    await createTransaction("Water Bill", 50, new Date("2025-01-20"), savingsAccount.id, utilitiesBudget.id);
    await createTransaction("Dinner at Restaurant", 60, new Date("2025-01-05"), checkingAccount.id, diningOutBudget.id);
    await createTransaction("Movie Night", 40, new Date("2025-01-18"), savingsAccount.id, entertainmentBudget.id);
    await createTransaction("Bus Pass", 25, new Date("2025-01-02"), checkingAccount.id, transportationBudget.id);
    await createTransaction("Fuel", 50, new Date("2025-01-12"), savingsAccount.id, transportationBudget.id);
    await createTransaction("Doctor Visit", 100, new Date("2025-01-25"), checkingAccount.id, healthcareBudget.id);
    await createTransaction("Pharmacy", 75, new Date("2025-01-28"), savingsAccount.id, healthcareBudget.id);
}
