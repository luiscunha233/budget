'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Account, Budget } from "@prisma/client";
import { Plus, Receipt } from "lucide-react";
import { useOptimistic, useState } from "react";
import { AccountPicker } from "../Account/AccountPicker";
import { createTransaction } from "@/lib/service/TransactionService";
import { Switch } from "../ui/switch";

export default function AddTransactionPopover(props: { budget: Budget, noTransactions?: boolean }) {
    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [date, setdate] = useState<Date>(new Date())
    const [creating, setCreating] = useState(false)
    const [open, setOpen] = useState(false)
    const [account, setAccount] = useState<string>("")
    const [type, setType] = useState(false)

    return <Popover open={open} onOpenChange={() => {setOpen(!open)}}>
        <PopoverTrigger asChild>
            <div className="inline-flex items-center text-gray-400 hover:text-gray-200 cursor-pointer">
                {!props.noTransactions && <><Plus size={15} /><Receipt size={20} /></>}
                {props.noTransactions && <Button size="sm" variant="ghost"><Plus size={15} /><Receipt size={20} /><p className="text-md ml-2">Add New Transaction</p></Button>}
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Create Transaction</h4>
                    <p className="text-sm text-muted-foreground">
                        Create a new transaction for {props.budget.name}.
                    </p>
                </div>
                <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="name">Account</Label>
                        <AccountPicker onClick={(acc) => {
                            setAccount(acc)
                        }} />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="name">Income</Label>
                        <Switch defaultChecked={false} onCheckedChange={(checked) => {
                            setType(checked)
                        }} />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Transaction Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-2 h-8"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="value">Value</Label>
                        <Input
                            id="value"
                            type="number"
                            placeholder="0.00"
                            value={value}
                            onChange={(e) => setValue(parseInt(e.target.value))}
                            className="col-span-2 h-8"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="date">Due Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={date.toISOString().split('T')[0]}
                            onChange={(e) => setdate(new Date(e.target.value))}
                            className="col-span-2 h-8"
                        />
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={creating || name == "" || value == 0 || account == ""}
                        onClick={async () => {
                            setCreating(true)
                            createTransaction(name, type ? value : -value, date, account, props.budget.id, "/budget/")
                            setCreating(false)
                            setName("")
                            setValue(0)
                            setdate(new Date())
                            setOpen(false)
                        }}
                    >
                        {creating ? 'Creating...' : 'Create'}
                    </Button>
                </div>
            </div>
        </PopoverContent>
    </Popover>
}