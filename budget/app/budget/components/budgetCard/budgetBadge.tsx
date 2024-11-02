import { Badge } from "@/components/ui/badge";

interface BudgetBadgeProps {
    text:string,
    value:number
}

export function BudgetBadge(props: BudgetBadgeProps) {
    return (
        <Badge variant="ghost" className="text-base m-2 space-x-2">
        <div>{props.text}</div>
        <div className="flex flex-row font-light whitespace-nowrap">{props.value} €</div>
        </Badge>
    )
}