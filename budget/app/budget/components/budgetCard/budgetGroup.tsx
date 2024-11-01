
import Card from "@/components/card"
import { Budget, BudgetGroup } from "@/model/model"
interface BudgetGroupProps {
    budgetGroup: BudgetGroup
}

export function BudgetGroupList(props: BudgetGroupProps) {
    return (
       <section className="w-full p-4 border-2 border-blue-400">
        <div>
        <h2>{props.budgetGroup.name}</h2>
        </div>
        <div>
        <p>{props.budgetGroup.type}</p>
        </div>
       </section>
       
    );
}