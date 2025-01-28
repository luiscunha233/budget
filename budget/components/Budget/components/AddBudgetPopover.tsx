'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createBudgetService } from "@/lib/service/BudgetService";
import { BudgetGroup } from "@prisma/client";
import { PiggyBank, Plus, Wallet } from "lucide-react";
import { useState } from "react";
import { addMonth } from "ts-date/locale/en";


export default function AddBudgetPopover(props: { year: number, month: number, budgetGroup: BudgetGroup }) {
    const [name, setName] = useState('')
    const [goal, setGoal] = useState(0)
    const [creating, setCreating] = useState(false)
    const [open, setOpen] = useState(false)


    const startDate = new Date(props.year, props.month - 1, 1);
    const endDate = addMonth(startDate, 1);

    return <Popover open={open} onOpenChange={()=> setOpen(!open)}>
        <PopoverTrigger asChild>
            <div className="inline-flex items-center text-gray-400 hover:text-gray-200 cursor-pointer"><Plus size={15} /><PiggyBank size={20} /></div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Create Budget</h4>
                    <p className="text-sm text-muted-foreground">
                        Create a new budget at {props.budgetGroup.name}.
                    </p>
                </div>
                <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Budget Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-2 h-8"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="goal">Goal</Label>
                        <Input
                            id="goal"
                            type="number"
                            placeholder="0.00"
                            value={goal}
                            onChange={(e) => setGoal(parseFloat(e.target.value))}
                            className="col-span-2 h-8"
                        />
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={creating}
                        onClick={async () => {
                            setCreating(true)
                            await createBudgetService(name, startDate, endDate, goal, props.budgetGroup.id)
                            setCreating(false)
                            setName("")
                            setGoal(0)
                            setOpen(false)
                         }
                        }
                    >
                        {creating ? 'Creating...' : 'Create'}
                    </Button>
                </div>
            </div>
        </PopoverContent>
    </Popover>

}