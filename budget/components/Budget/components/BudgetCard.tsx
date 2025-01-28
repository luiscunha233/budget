import { Budget } from "@prisma/client"
import BudgetIcon from "./BudgetIcon"
import BudgetDetails from "./BudgetDetails"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { HSLColor } from "@/lib/utils"

interface BudgetCardProps {
    budget:Budget,
    color: HSLColor
}

export default function BudgetCard(props: BudgetCardProps) {
    return <div className="flex flex-row my-1 gap-2 items-center">
            <BudgetIcon icon={"test"}/>
            <BudgetDetails budget={props.budget} color={props.color} />
            <Link  href={`/budget/${props.budget.id}`} className="text-xs text-gray-400"><ChevronRight /></Link>
    </div>
}

