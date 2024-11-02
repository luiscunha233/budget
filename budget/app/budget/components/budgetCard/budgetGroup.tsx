
"use client";

import { Label } from "@/components/ui/label";
import { Budget, BudgetGroup } from "@/model/model"
import { BudgetCard } from "./budgetCard";
import { useEffect, useState } from "react";
interface BudgetGroupProps {
    budgetGroup: BudgetGroup
}

async function getBudgets(budgetGroup: BudgetGroup): Promise<Budget[]>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budgets: budgetGroup.budgets })
    }
    return await fetch('/api/budget/list',requestOptions).then((res) => res.json())
}



export function BudgetGroupList(props: BudgetGroupProps) {

    const [budgets, setBudgets] = useState<Budget[]>([]);

    useEffect(() => {
        getBudgets(props.budgetGroup).then((data) => setBudgets(data));
    }, []);

    return (
        <div className="flex flex-col rounded-md mb-5">
            <div className="m-2">
                <Label className="text-xl">{props.budgetGroup.name}</Label>
            </div>
            <div>
               {budgets.map((budget: Budget) => <BudgetCard budget={budget} />)}
            </div>
        </div>
    );
}