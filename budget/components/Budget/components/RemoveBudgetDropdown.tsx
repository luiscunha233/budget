"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteBudgetService } from "@/lib/service/BudgetService";
import { Budget } from "@prisma/client"
import { EllipsisVertical, Trash2 } from "lucide-react"
import { useState } from "react";


export function RemoveBudgetDropdown(props: { budget: Budget }) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <EllipsisVertical className="text-xs text-gray-400 hover:text-gray-200 cursor-pointer" size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-46">
                <DropdownMenuItem className="items-center justify-left" onClick={async () => {
                    await deleteBudgetService(props.budget.id, "/budgetGroups");
                    setOpen(false);
                }}>
                    <Trash2 size={18} /> <p>Delete</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
