"use client"

import { Separator } from "@/components/ui/separator"
import { Budget, Transaction } from "@/model/model"

import { Scroll } from "lucide-react";
import { BudgetTransactionItem } from "./BudgetTransactionItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

export interface BudgetTransactionsProp {
    transactions: Transaction[]
}



export function BudgetTransactions(props: BudgetTransactionsProp) {

    return (
        <div className="flex flex-col w-full mx-4 mt-10">
            <div><h1 className="text-xl font-semibold">Transactions</h1></div>
            <div className="w-[calc(100%-3rem)]"><Separator className="my-4" /></div>
            <ScrollArea className="w-[calc(100%-3rem)] h-96 pr-4">
                {props.transactions.map((transaction)=> <div>
                    <BudgetTransactionItem transaction={transaction}/>
                    <div className="w-full"><Separator className="my-4" /></div>
                </div>)}
            </ScrollArea>
        </div>
    )
}