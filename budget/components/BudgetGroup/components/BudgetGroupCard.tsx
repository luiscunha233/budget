import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBudgetOfBudgetGroupByMonth, getBudgetsInBudgetGroup } from "@/lib/db/BudgetGroup";
import { Budget, BudgetGroup } from "@prisma/client";
import BudgetCard from "@/components/Budget/components/BudgetCard";
import BudgetGroupAmount from "./BudgetGroupAmount";
import { BudgetGroupPiechart } from "./BudgetGroupPiechart";
import { calculateBudgetGroupTotals } from "@/lib/service/BudgetGroupService";
import { generateColorPallet, HSLColor, HSLColorToString } from "@/lib/utils";
import AddBudgetPopover from "@/components/Budget/components/AddBudgetPopover";
import { HandCoins, NotebookPen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface BudgetGroupCardProps {
  income: number,
  budgetGroup: BudgetGroup,
  year: number,
  month: number,
  color: HSLColor
}

export default async function BudgetGroupCard(props: BudgetGroupCardProps) {

  const budgets = await getBudgetOfBudgetGroupByMonth(props.budgetGroup.id, props.year, props.month);
  const totalOfBudgets = await calculateBudgetGroupTotals(budgets);
  const nameHash = props.budgetGroup.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = generateColorPallet(budgets.length, { hue: nameHash % 360, saturation: 78, lightness: 44 }, { hue: nameHash % 50, saturation: -2, lightness: -1 });
  const percentageAllocated = (totalOfBudgets.totalGoal / props.income) * 100;


  return <Card className={`min-w-[200px] min-h-[200px] w-fit  ${!budgets || budgets.length == 0 ? "h-fit" : ""}`}>
    <CardHeader className="flex flex-row place-content-between items-center">
      <div className="flex flex-row h-fit gap-2 items-center">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: HSLColorToString(props.color) }} />
        <CardTitle className="text-m">{props.budgetGroup.name}</CardTitle>
      </div>
      <div className="flex flex-row gap-1 items-center pb-1"><p className="text-xs"> {parseFloat(percentageAllocated.toFixed(2))}%</p><NotebookPen size={14} /></div>
    </CardHeader>
    <CardContent className="flex flex-col items-center">
      <BudgetGroupPiechart budgets={budgets} totalSpent={totalOfBudgets.totalSpent} totalGoal={totalOfBudgets.totalGoal} colors={colors} />
      <div className="flex w-full justify-end">
        <AddBudgetPopover year={props.year} month={props.month} budgetGroup={props.budgetGroup} />
      </div>
      {budgets.length <= 4 &&
        <div className="flex flex-col">
          {budgets.map((budget: Budget, index) => <BudgetCard key={index} budget={budget} color={colors[index]} />)}
        </div>
      }
      {budgets.length > 4 && <ScrollArea className="mt-5 pr-3 h-[317px]">
        {budgets.map((budget: Budget, index) => <BudgetCard key={index} budget={budget} color={colors[index]} />)}
      </ScrollArea>}
    </CardContent>
  </Card>
}  