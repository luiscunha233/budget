import { getBudgetById } from "../db/Budget";
import { calculateBalance } from "./TransactionService";

export async function getBudgetBalance(id: string) {
    let budget = await getBudgetById(id);
    if (budget?.Transactions && budget.Transactions.length > 0) {
        return calculateBalance(budget.Transactions);
    }
}