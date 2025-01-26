import { Budget } from "@prisma/client"

interface BudgetCardProps {
    budget:Budget
}

export default function BudgetCard(props: BudgetCardProps) {
    return <div>{props.budget.name} {props.budget.goal}</div>
}

