'use client';

import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Budget } from '@prisma/client';


interface BudgetCardInfoProps {
    budget: Budget,
    budgetUsed : number
}

export function BudgetCardInfo(props: BudgetCardInfoProps) {
    return (
            <div className="flex flex-col w-full min-w-40 max-w-96 mx-15">
                <div className="flex flex-row justify-between w-full">
                    <div><Label className="text-xl">{props.budget.name}</Label></div>
                    <div><Label className="text-lg font-normal">{(props.budgetUsed/props.budget.goal)*100}%</Label></div>
                </div>
                <Progress value={(props.budgetUsed/props.budget.goal)*100} />
            </div>
    )
}