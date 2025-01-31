import { createAccount } from "../db/Accounts";
import { createBudget } from "../db/Budget";
import { createBudgetGroup } from "../db/BudgetGroup";
import { createInvestment } from "../db/Investment";
import { createTransaction } from "./TransactionService";

export async function populateDatabase() {
    // const HomeBudgetGroup = await createBudgetGroup("Home Expenses", "Expense");
    // const dailyLivingBudgetGroup = await createBudgetGroup("Daily Living", "Expense");
    // const entertaimentBudgetGroup = await createBudgetGroup("Entertainment", "Expense");
    // const TRANSPORTATIONBudgetGroup = await createBudgetGroup("TRANSPORTATION", "Expense");
    // const healthBudgetGroup = await createBudgetGroup("HEALTH", "Expense");
    // const subscriptionsBudgetGroup = await createBudgetGroup("SUBSCRIPTIONS", "Expense");
    // const miscellaneousBudgetGroup = await createBudgetGroup("MISCELLANEOUS", "Expense");

    const account = await createAccount("OpenBank", "Checking", "bank");
    const account2 = await createAccount("TR", "Saving", "cash");
    const account3 = await createAccount("BCP", "Checking", "cash");


}
