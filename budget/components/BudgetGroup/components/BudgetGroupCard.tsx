import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBudgetOfBudgetGroupByMonth, getBudgetsInBudgetGroup } from "@/lib/db/BudgetGroup";
import { Budget, BudgetGroup } from "@prisma/client";
import BudgetCard from "@/components/Budget/components/BudgetCard";
import BudgetGroupAmount from "./BudgetGroupAmount";
import { BudgetGroupPiechart } from "./BudgetGroupPiechart";
import { calculateBudgetGroupTotals } from "@/lib/service/BudgetGroupService";
import { generateColorPallet, HSLColor, HSLColorToString } from "@/lib/utils";

export interface BudgetGroupCardProps {
  budgetGroup: BudgetGroup,
  year: number,
  month: number,
  color : HSLColor
}

export default async function BudgetGroupCard(props: BudgetGroupCardProps) {

  const budgets = await getBudgetOfBudgetGroupByMonth(props.budgetGroup.id, props.year, props.month);
  const totalOfBudgets = await calculateBudgetGroupTotals(budgets);
  const colors = generateColorPallet(budgets.length,{hue: 307, saturation: 78, lightness: 44}, {hue: -38, saturation: -2, lightness: -1} );

  return <Card className="min-w-[200px] min-h-[200px]">
    <CardHeader className="flex flex-row items-center gap-2">
    <div className="w-4 h-4 mt-1 rounded-full" style={{ backgroundColor: HSLColorToString(props.color) }}/>
      <CardTitle className="text-m">{props.budgetGroup.name}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center">
      <BudgetGroupPiechart budgets={budgets} totalSpent={totalOfBudgets.totalSpent} totalGoal={totalOfBudgets.totalGoal} colors={colors} />
      <div>
        {budgets.map((budget: Budget,index) => <BudgetCard key={budget.id} budget={budget} color={colors[index]} />)}
      </div>
    </CardContent>
  </Card>
}  