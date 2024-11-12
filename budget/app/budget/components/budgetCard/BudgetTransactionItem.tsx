'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Account, Transaction } from '@prisma/client';
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";

interface BudgetTransactionItemProps {
    transaction: Transaction
}

async function getAccount(account: ObjectId):Promise<Account> {
    return await fetch(`/api/account/${account.toString()}`).then((res) => res.json())
}

export function BudgetTransactionItem(props: BudgetTransactionItemProps) {

    const [account, setAccount] = useState<Account>();

    useEffect(() => {
        getAccount(props.transaction.account).then(account => setAccount(account));
    },[])

    return (
        <div className="flex flex-row justify-between my-4">
            <div className="flex flex-row  items-center">
                <Avatar className="mx-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Label className="text-lg ml-4">{account?.name}</Label>
            </div>    
            <div className="flex flex-col align-center">
                <Label className="text-lg text-rose-600 mx-auto">{`${props.transaction.value}€`}</Label>
                <Label className="text-xs mx-auto">{new Date(props.transaction.date).toLocaleDateString()}</Label>
            </div>
        </div>
        
    )
}

