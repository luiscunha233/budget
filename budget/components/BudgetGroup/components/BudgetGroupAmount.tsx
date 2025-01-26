import { get } from "http";
import { BudgetGroupCardProps } from "./BudgetGroupCard";
import { calculateBudgetGroupTotals } from "@/lib/service/BudgetGroupService";
import { Budget } from "@prisma/client";

export interface BudgetGroupTotals {
    budgets: Budget[]
}

export default async function BudgetGroupAmount(props: BudgetGroupTotals) {

    const totals = await calculateBudgetGroupTotals(props.budgets);

    return <div className="my-2 text-2xl">{totals.totalGoal} {totals.totalSpent} </div>
}