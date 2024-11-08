'use client';

import { Budget, Transaction } from "@/model/model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BudgetCardInfo } from "./budgetCardInfo";
import { BudgetBadge } from "./budgetBadge";
import { Button } from "@/components/ui/button";
import { ChevronsDown, ChevronsUp, DiamondPlus, Pencil, Settings2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BudgetTransactions } from "./budgetTransactions";

interface budgetCardContentProp {
    budget: Budget,
    onDelete: (budget: Budget) => void
}

async function getTransactions(budget: Budget): Promise<Transaction[]> {

    return await fetch(`/api/transaction/budget/${budget._id}`).then((res) => res.json())
}


export function BudgetCardContent(props: budgetCardContentProp) {
    const [open, setOpen] = useState(false);
    const [transactions, setTranasactions] = useState<Transaction[]>([])
    const [budgetUsed, calculateBudgetUsage] = useState<number>(0)



    useEffect(() => {
        getTransactions(props.budget).then((data) => {
            let usedBudget = 0.0;
            data.forEach((transaction: Transaction) => {
                usedBudget += (transaction.value*-1)
            })
            calculateBudgetUsage(usedBudget);
            setTranasactions(data as Transaction[])
        })
    }, [])

    return (
        <div className="flex flex-col m-4">
            <div className="flex flex-row justify-between">
                <Avatar className="mx-4">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <BudgetCardInfo budget={props.budget} budgetUsed={budgetUsed} />
                <div className="flex flex-wrap justify-center">
                    <BudgetBadge text="Budget" value={props.budget.goal}></BudgetBadge>
                    <BudgetBadge text="Used" value={budgetUsed}></BudgetBadge>
                    <BudgetBadge text="Remaining" value={props.budget.goal-budgetUsed}></BudgetBadge>
                </div>
                <div className="flex flex-row justify-between">
                    <Button variant="ghost" size="icon"><DiamondPlus size={18} /></Button>
                    <Button variant="ghost" size="icon"><Pencil size={18} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => {
                        fetch('/api/budget/delete', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(props.budget)}).then(() => props.onDelete(props.budget))
                    }}><Trash2 size={18} /></Button>
                    <Button variant="ghost" size="icon"><Settings2 size={18} /></Button>
                </div>
                <div className="basis-auto">
                    <Button onClick={() => setOpen(!open)} size="icon" variant="ghost">{open ? <ChevronsUp size={24} strokeWidth={2} /> : <ChevronsDown size={24} strokeWidth={2} />}</Button>
                </div>
            </div>
            {open && <BudgetTransactions transactions={transactions} />}
        </div>
    )
}