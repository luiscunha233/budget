import { Separator } from "@/components/ui/separator"
import { Budget } from "@/model/model"

export interface BudgetTransactionsProp {
    budget: Budget
}

export function BudgetTransactions(props: BudgetTransactionsProp) {
    return (
        <div className="flex flex-col w-full m-4 mt-10">
            <div><h1 className="text-xl font-semibold">Transactions</h1></div>
            <div className="w-full"><Separator className="my-4"/></div>
        </div>
    )
}