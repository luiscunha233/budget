'use client';

import { Label } from "@/components/ui/label";
import { Budget, BudgetGroup } from '@prisma/client'
import { BudgetCard } from "./budgetCard";
import { useEffect, useState } from "react";
import { AddBudgetDialog } from "../../dialogs/addBudgetDialog";
interface BudgetGroupProps {
    budgetGroup: BudgetGroup & { budgets: Budget[] }
}


export function BudgetGroupList(props: BudgetGroupProps) {

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
                }}  ></AddBudgetDialog>
            </div>
            <div>
                {props.budgetGroup.budgets.map((budget: Budget) => <BudgetCard budget={budget}  />)}
            </div>
        </div>
    );
}