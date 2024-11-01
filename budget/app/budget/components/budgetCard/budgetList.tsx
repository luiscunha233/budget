import { Budget, BudgetGroup } from "@/model/model"
import { BudgetCard } from "./budgetCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { BudgetGroupList } from "./budgetGroup"

interface BudgetListProps {
    budgetGroups?: BudgetGroup[],
    budgetType?: string
}

export function BudgetList(props: BudgetListProps) {
    return (
        <ScrollArea className="w-4/5">
            {
                props.budgetGroups?.map((budgetGroup) => {
                    if (props.budgetType === budgetGroup.type || props.budgetType === "all") {
                        return <BudgetGroupList budgetGroup={budgetGroup} />
                    }
                })
            }
        </ScrollArea>)
}