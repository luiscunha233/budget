import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getBudgetOfBudgetGroupByMonth, getBudgetsInBudgetGroup } from "@/lib/db/BudgetGroup";
import { Budget, BudgetGroup } from "@prisma/client";
import BudgetCard from "@/components/Budget/components/BudgetCard";
import BudgetGroupAmount from "./BudgetGroupAmount";
import { Component } from "./BudgetGroupPiechart";

export interface BudgetGroupCardProps {
    budgetGroup:BudgetGroup,
    year:number,
    month:number
}

export default async function BudgetGroupCard(props: BudgetGroupCardProps) {

    const budgets = await getBudgetOfBudgetGroupByMonth(props.budgetGroup.id,props.year,props.month);
      
    return <Card className="min-w-[200px] min-h-[200px]">
    <CardHeader>
      <CardTitle className="text-m">{props.budgetGroup.name}</CardTitle>
    </CardHeader>
    <CardContent>
    <Component/>
      {budgets.map((budget:Budget) => <BudgetCard key={budget.id} budget={budget} />)}
    </CardContent>
    {/* <CardFooter>
      <p>Card Footer</p>
    </CardFooter> */}
  </Card>
  }  