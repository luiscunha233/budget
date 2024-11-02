"use client";

import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Budget } from "@/model/model";


interface BudgetCardInfoProps {
    budget: Budget
}

export function BudgetCardInfo(props: BudgetCardInfoProps) {
    return (
            <div className="flex flex-col w-full min-w-40 max-w-96 mx-15">
                <div className="flex flex-row justify-between w-full">
                    <div><Label className="text-xl">{props.budget.name}</Label></div>
                    <div><Label className="text-lg font-normal">75%</Label></div>
                </div>
                <Progress value={50} />
            </div>
    )
}