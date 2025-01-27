import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBudgetOfBudgetGroupByMonth, getBudgetsInBudgetGroup } from "@/lib/db/BudgetGroup";
import { Budget, BudgetGroup } from "@prisma/client";
import BudgetCard from "@/components/Budget/components/BudgetCard";
import BudgetGroupAmount from "./BudgetGroupAmount";
import { BudgetGroupPiechart } from "./BudgetGroupPiechart";
import { calculateBudgetGroupTotals } from "@/lib/service/BudgetGroupService";

export interface BudgetGroupCardProps {
  budgetGroup: BudgetGroup,
  year: number,
  month: number
}

export default async function BudgetGroupCard(props: BudgetGroupCardProps) {

  const budgets = await getBudgetOfBudgetGroupByMonth(props.budgetGroup.id, props.year, props.month);
  const totalOfBudgets = await calculateBudgetGroupTotals(budgets);

  return <Card className="min-w-[200px] min-h-[200px]">
    <CardHeader>
      <CardTitle className="text-m">{props.budgetGroup.name}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center">
      <BudgetGroupPiechart budgets={budgets} totalSpent={totalOfBudgets.totalSpent} totalGoal={totalOfBudgets.totalGoal} />
      <div>
        {budgets.map((budget: Budget) => <BudgetCard key={budget.id} budget={budget} />)}
      </div>
    </CardContent>
  </Card>
}  