import { Card, CardContent } from "@/components/ui/card";
import { getBudgetBalance } from "@/lib/service/BudgetService";
import { Budget, Transaction } from "@prisma/client";
import { format } from "ts-date/locale/en";
import BudgetSpentProgressBar from "./BudgetSpentProgressBar";
import { TransactionChart } from "@/components/Transaction/TransactionChart";
import { TransactionLineChart } from "@/components/Transaction/TransactionLineChart";

export default async function BudgetHeaderDetails(props: { budget: Budget, transactions: Transaction[] }) {
    const budgetSpent = await getBudgetBalance(props.budget.id);

    return <div className="flex flex-row ml-2 my-1">
        <Card>
            <CardContent className="flex flex-row gap-4 mt-5 min-w-[400px] place-content-between items-center">
                <div>
                    <div className="mb-4">
                        <div className="font-bold text-2xl">{props.budget.name}</div>
                        <div className="font-bold text-sm text-gray-400">{format(props.budget.startDate, "MMM YYYY")}</div>
                    </div>
                    <div>
                        <div className="flex flex-row gap-2 items-center">
                            <div className="font-bold text-xl">{budgetSpent}€</div>
                            <div className="font-bold text-sm text-gray-400">of {props.budget.goal}€</div>

                        </div>
                        <BudgetSpentProgressBar budgetSpent={budgetSpent ?? 0} budgetGoal={props.budget.goal} />
                    </div>
                </div>
                <div className="min-w-[200px]">
                    <TransactionLineChart transactions={props.transactions} budgetGoal={props.budget.goal} months={props.budget.startDate.getMonth() + 1} year={props.budget.startDate.getFullYear()} />
                </div>
            </CardContent>
        </Card>
    </div>
}