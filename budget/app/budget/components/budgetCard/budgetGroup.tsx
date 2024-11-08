'use client';

import { Label } from "@/components/ui/label";
import { Budget, BudgetGroup } from "@/model/model"
import { BudgetCard } from "./budgetCard";
import { useEffect, useState } from "react";
import { AddBudgetDialog } from "../../dialogs/addBudgetDialog";
interface BudgetGroupProps {
    budgetGroup: BudgetGroup
}

async function getBudgets(budgetGroup: BudgetGroup): Promise<Budget[]> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budgets: budgetGroup.budgets })
    }
    return await fetch('/api/budget/list', requestOptions).then((res) => res.json());
}


export function BudgetGroupList(props: BudgetGroupProps) {

    const [budgets, setBudgets] = useState<Budget[]>([]);

    useEffect(() => {
        getBudgets(props.budgetGroup).then((data) => setBudgets(data));
    }, []);

    return (
        <div className="flex flex-col rounded-md mb-5">
            <div className="flex flex-row items-center m-2">
                <Label className="text-xl font-semibold">{props.budgetGroup.name}</Label>
                <AddBudgetDialog OnAddSumit={async (dialogData) => {
                    const budget = {
                        name: dialogData.name,
                        goal: dialogData.goal,
                        date: new Date()
                    }

                    const addResult = await fetch('/api/budget/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(budget)
                    })
                    const data = await addResult.json();
                    const addBudgetResult = await fetch('/api/budgetgroup/addBudget', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ budgetGroup: props.budgetGroup._id, budget: data._id })
                    })
                    setBudgets(budgets.concat(data));
                }}  ></AddBudgetDialog>
            </div>
            <div>
                {budgets.map((budget: Budget) => <BudgetCard budget={budget} onDelete={(budget) => setBudgets(budgets.filter((b) => b._id != budget._id))} />)}
            </div>
        </div>
    );
}