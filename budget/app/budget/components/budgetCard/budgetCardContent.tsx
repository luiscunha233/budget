"use client";

import { Budget } from "@/model/model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BudgetCardInfo } from "./budgetCardInfo";
import { BudgetBadge } from "./budgetBadge";
import { Button } from "@/components/ui/button";
import { ChevronsDown, ChevronsUp, DiamondPlus, Pencil, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { BudgetTransactions } from "./budgetTransactions";

interface budgetCardContentProp {
    budget: Budget
}

export function BudgetCardContent(props: budgetCardContentProp) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col">
        <div className="flex flex-row justify-between">
            <Avatar className="mx-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <BudgetCardInfo budget={props.budget}/>
            <div className="flex flex-wrap justify-center">
            <BudgetBadge text="Budget" value={900.1}></BudgetBadge>
            <BudgetBadge text="Used" value={900.1}></BudgetBadge>
            <BudgetBadge text="Remaining" value={900.1}></BudgetBadge>
            </div>
            <div className="flex flex-row justify-between">
            <Button variant="ghost" size="icon"><DiamondPlus size={18}/></Button>
            <Button variant="ghost" size="icon"><Pencil size={18} /></Button>
            <Button variant="ghost" size="icon"><Trash2 size={18}/></Button>
            <Button variant="ghost" size="icon"><Settings2 size={18}/></Button>
            </div>
            <div className="basis-auto">
            <Button onClick={() => setOpen(!open)} size="icon" variant="ghost">{open ? <ChevronsUp size={24} strokeWidth={2}/> : <ChevronsDown size={24} strokeWidth={2}/>}</Button>
            </div>
        </div>
        {open && <BudgetTransactions budget={props.budget}/>}
        </div>
    )
}