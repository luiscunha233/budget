"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createBudgetGroup } from "@/server-functions/BudgetGroup"
import { BudgetGroup } from "@prisma/client"

import { Plus } from "lucide-react"
import { useState } from "react"

export interface BudgetGroupAddDialogProps {
  date: string | undefined,
  type: string,
  setBudgetGroups: (budgets: BudgetGroup[]) => void
}

export function BudgetGroupAddDialog(props: BudgetGroupAddDialogProps) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="space-x-2"><Plus size={16}/><span>Add Budget Group</span></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Budget Group</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Name
            </Label>
            <Input onChange={(change) => setName(change.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter >
          <Button onClick={async ()=>{
            createBudgetGroup(name,props.type == 'all' ? 'expenses' : props.type);
            setOpen(false);
            }}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}