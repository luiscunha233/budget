'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Account, Budget } from "@prisma/client";
import { Plus, Receipt } from "lucide-react";
import { useState } from "react";

export default function AddTransactionPopover(props: { budget: Budget, noTransactions?: boolean }) {
    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [dueDate, setDueDate] = useState<Date>(new Date())
    const [creating, setCreating] = useState(false)
    const [open, setOpen] = useState(false)

    return <Popover open={open} onOpenChange={() => setOpen(!open)}>
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
                            type="text"
                            placeholder="0.00"
                            value={value}
                            onChange={(e) => setValue(parseInt(e.target.value))}
                            className="col-span-2 h-8"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            type="date"
                            value={dueDate.toISOString().split('T')[0]}
                            onChange={(e) => setDueDate(new Date(e.target.value))}
                            className="col-span-2 h-8"
                        />
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={creating}
                        onClick={async () => {
                            setCreating(true)
                            // TODO: Add createTransactionService call here
                            // await createTransactionService(name, value, dueDate, props.budget.id, props.account.id)
                            setCreating(false)
                            setName("")
                            setValue(0)
                            setDueDate(new Date())
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