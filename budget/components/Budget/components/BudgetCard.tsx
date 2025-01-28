import { Budget } from "@prisma/client"
import BudgetIcon from "./BudgetIcon"
import BudgetDetails from "./BudgetDetails"
import { ChevronRight, EllipsisVertical, Trash2 } from "lucide-react"
import Link from "next/link"
import { HSLColor } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { RemoveBudgetDropdown } from "./RemoveBudgetDropdown"

interface BudgetCardProps {
    budget: Budget,
    color: HSLColor
}

export default function BudgetCard(props: BudgetCardProps) {
    return <div className="flex flex-row my-1 gap-2 items-center">
        <BudgetIcon icon={"test"} />
        <BudgetDetails budget={props.budget} color={props.color} />
        <div className="flex flex-col place-content-between items-center gap-2">
            <RemoveBudgetDropdown budget={props.budget} />
            <Link href={`/budget/${props.budget.id}`} className="text-xs text-gray-400 hover:text-gray-200"><ChevronRight /></Link>
        </div>
    </div>
}

