import BudgetHeaderDetails from "@/components/Budget/components/BudgetHeaderDetails";
import BudgetTransactions from "@/components/Budget/components/BudgetTransactions";
import { getBudgetById } from "@/lib/db/Budget"
import { Budget, Transaction } from "@prisma/client";

export default async function BudgetPage({params}: {params: {id: string}}) {
    const budget = await getBudgetById((await params).id);

    return <div className="flex flex-col">
        <BudgetHeaderDetails budget={budget as Budget} transactions={budget?.Transactions as Transaction[]} />
        <BudgetTransactions transactions={budget?.Transactions as Transaction[]} budget={budget as Budget} />
    </div>;
}