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
import { createBudget } from "@/server-functions/Budget"
import { BudgetGroup } from "@prisma/client"
import { Plus } from "lucide-react"
import { useState } from "react"


export interface BudgetAddDialogProps {
  budgetGroup: BudgetGroup
}

export function AddBudgetDialog(props: BudgetAddDialogProps) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(0);
  const [open, setOpen] = useState(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-4" ><Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Budget Group</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input onChange={(change) => setName(change.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="goal" className="text-right">
              Goal
            </Label>
          <Input onChange={(change) => setGoal(+change.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter >
          <Button onClick={async () => {
            createBudget(props.budgetGroup.id,name,goal);
            setOpen(false);
          }}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}