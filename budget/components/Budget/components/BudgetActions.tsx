import { Budget } from "@prisma/client";
import { DiamondPlus } from "lucide-react";

export default function BudgetActions(props: {budget: Budget}) {
    return <div><DiamondPlus size={26} /></div>
}