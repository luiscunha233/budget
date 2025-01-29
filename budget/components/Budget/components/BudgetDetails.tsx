import { getBudgetBalance } from "@/lib/service/BudgetService";
import { Budget } from "@prisma/client";
import BudgetSpentProgressBar from "./BudgetSpentProgressBar";
import { getBudgetById } from "@/lib/db/Budget";
import { HSLColor, HSLColorToString } from "@/lib/utils";



export default async function BudgetDetails(props: { budget: Budget, color : HSLColor }) {

    const budgetSpent = await getBudgetBalance(props.budget.id);
    const budgetWithTransactions = await getBudgetById(props.budget.id);

    return <div className="flex flex-col ml-2 my-1">
        <div className="flex flex-row w-full min-w-[200px] place-content-between ">
            <div>
                <div className="flex flex-row items-center gap-2">
                    <div className="font-bold">{props.budget.name}</div>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: HSLColorToString(props.color) }}/>
                </div>
                <div className="text-[10.5px] text-gray-400">{budgetWithTransactions?.Transactions.length} Transactions</div>
            </div>
            <div className="flex flex-col items-end">
                <div >{budgetSpent ?? 0}€</div>
                <div className="text-[10.5px] text-gray-400">of {props.budget.goal}€</div>
            </div>
        </div>
        <BudgetSpentProgressBar budgetSpent={budgetSpent ?? 0} budgetGoal={props.budget.goal} />
    </div>
}