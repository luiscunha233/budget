import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"
import { start } from "repl"

export interface BudgetAddDialogProps {
  date: string | undefined,
  type: string
}

export function BudgetAddDialog(props: BudgetAddDialogProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState(0);


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Add <Plus className="mx-1" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Budget</DialogTitle>
          <DialogDescription>
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)} {new Date(props.date ?? "").toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Name
            </Label>
            <Input onChange={(change) => setName(change.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input onChange={(change) => setCategory(change.target.value)} id="category" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goal" className="text-right">
              Goal
            </Label>
            <Input onChange={(change) => setGoal(Number(change.target.value))} id="goal" className="col-span-3" />
          </div>
        </div>
        <DialogFooter >
          <Button onClick={async ()=>{
            await fetch("/api/budget/add",{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body: JSON.stringify({
                category:category,
                name:name,
                goal:goal,
                type:props.type,
                startDate:props.date,
                endDate:props.date
              })
            })}}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}