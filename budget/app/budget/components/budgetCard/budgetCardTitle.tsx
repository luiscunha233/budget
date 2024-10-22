import { Budget } from "@/model/model";

interface BudgetCardTitleProp {
    budget: Budget
}

export function BudgetCardTitle(props: BudgetCardTitleProp) {
    return (
        <div className="flow-root">
        <div className="float-left text-2xl">{props.budget.name}</div>
        <div className="float-right text-2xl">{props.budget.goal}€</div>
        </div>
    )
}