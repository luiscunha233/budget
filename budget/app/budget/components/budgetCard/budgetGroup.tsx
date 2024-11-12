'use client';

import { Label } from "@/components/ui/label";
import { Budget, BudgetGroup } from '@prisma/client'
import { BudgetCard } from "./budgetCard";
import { AddBudgetDialog } from "../../dialogs/addBudgetDialog";
import { useCallback, useState } from "react";
interface BudgetGroupProps {
    budgetGroup: BudgetGroup & { budgets: Budget[] }
}


export function BudgetGroupList(props: BudgetGroupProps) {

    const [budgets, setBudgets] = useState(props.budgetGroup.budgets);
    const callSetBudgets = useCallback((budget: Budget) => {
        setBudgets(budgets.concat(budget))
    },[]);

    return (
        <div className="flex flex-col rounded-md mb-5">
            <div className="flex flex-row items-center m-2">
                <Label className="text-xl font-semibold">{props.budgetGroup.name}</Label>
                <AddBudgetDialog setBudget={callSetBudgets} budgetGroup={props.budgetGroup}></AddBudgetDialog>
            </div>
            <div>
                {budgets.map((budget: Budget) => <BudgetCard budget={budget}  />)}
            </div>
        </div>
    );
}