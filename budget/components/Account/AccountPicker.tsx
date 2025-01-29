"use client";

import { Account, Budget } from "@prisma/client"
import { useEffect, useState } from "react";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Select } from "@radix-ui/react-select";
import { getAllAccountsService } from "@/lib/service/AccountService";



export function AccountPicker(props: { onClick: (account: string) => void }) {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const accountsData = await getAllAccountsService();
            setAccounts(accountsData);
        };
        fetchAccounts();
    }, []);

    return (
        <Select onValueChange={props.onClick}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Account" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                            {account.name} ({account.currentBalance}€)
                        </SelectItem>))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
