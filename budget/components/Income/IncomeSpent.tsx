import { getBudgetOfBudgetGroupByMonth } from "@/lib/db/BudgetGroup";
import { calculateBudgetGroupTotals, getAllBudgetGroupsService, getBudgetGroupsInMonthService } from "@/lib/service/BudgetGroupService";
import { cn, HSLColor } from "@/lib/utils";
import { cloneElement } from "react";

export default async function IncomeAllocations(props: { income: number, month: number, year: number, colors : HSLColor[] }) {

    const allocationByBudgetGroup = [] ;
    const allBudgetGroups = await getBudgetGroupsInMonthService(props.year,props.month);
    let totalPercentage = 0;
    
    for (let i = 0; i < allBudgetGroups.length; i++) {
        
        const budgetGroup = allBudgetGroups[i];
        const budgets = await getBudgetOfBudgetGroupByMonth(budgetGroup.id, props.year, props.month);
        const totalOfBudgets = await calculateBudgetGroupTotals(budgets);
        console.log(totalOfBudgets);
        const budgetPercentage = (totalOfBudgets.totalSpent / props.income) * 100;
        totalPercentage += budgetPercentage;
        
        allocationByBudgetGroup.push(<div id={budgetGroup.id} className="h-5 z-1" style={{ width: `${budgetPercentage}%`
        , backgroundColor: `hsl(${props.colors[i].hue}, ${props.colors[i].saturation}%, ${props.colors[i].lightness}%)` }}/>);
    }
    if (allocationByBudgetGroup.length === 1) {
        allocationByBudgetGroup[0] = cloneElement(allocationByBudgetGroup[0], { className: cn(allocationByBudgetGroup[0].props.className, "rounded-full") });
    } else if(allocationByBudgetGroup.length > 0) {
        allocationByBudgetGroup[0] = cloneElement(allocationByBudgetGroup[0],{className: cn(allocationByBudgetGroup[0].props.className, "rounded-l-full")});
        allocationByBudgetGroup[allocationByBudgetGroup.length-1] = cloneElement(allocationByBudgetGroup[allocationByBudgetGroup.length-1],{className: cn(allocationByBudgetGroup[allocationByBudgetGroup.length-1],"rounded-r-full")});
    }

    return <div className="flex flex-row w-full mt-1 min-w-[450px] items-center gap-2">
        <div className="flex flex-row h-5 mt-1 w-[100%] bg-gray-600 rounded-full">
            {allocationByBudgetGroup}
        </div>    
    </div>
}