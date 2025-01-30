import { HSLColor } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import IncomeAllocations from "./IncomeAllocations";
import { BudgetGroup } from "@prisma/client";
import { calculateTotalForBudgetGroupsInMonth } from "@/lib/service/BudgetGroupService";
import IncomeSpent from "./IncomeSpent";


export default async function IncomeDisplay(props: { budgetsGroups: BudgetGroup[], income: number, month: number, year: number, colors: HSLColor[] }) {

    const totalAllocated = await calculateTotalForBudgetGroupsInMonth(props.year, props.month);
    const allocatedPercentage = ((totalAllocated.totalGoal ?? 0) / props.income) * 100;
    const spentPercentage = ((totalAllocated.totalSpent ?? 0) / props.income) * 100;


    return (<Card className="w-fit mt-4 pt-4">
        <CardContent className="flex flex-row items-center gap-4">
            <div className="flex flex-col">
                <div className={`font-bold text-2xl ${totalAllocated.totalGoal > props.income ? "text-red-500" : ""}`}>{totalAllocated.totalGoal}€</div>
                <div className="font-bold text-gray-400 text-sm">of {props.income}€</div>
            </div>
            <div>
                <div className="flex flex-row place-content-between">
                    <div className="font-bold text-sm">Allocation</div>
                    <div className={`font-bold text-sm ${totalAllocated.totalGoal > props.income ? "text-red-500" : "text-gray-400"}`}>{parseFloat(allocatedPercentage.toFixed(2))}%</div>
                </div>
                <IncomeAllocations income={props.income} month={props.month} year={props.year} colors={props.colors} />
            </div>
            <div>
                <div className="flex flex-row place-content-between">
                    <div className="font-bold text-sm">Spent</div>
                    <div className={`font-bold text-sm ${totalAllocated.totalSpent > props.income ? "text-red-500" : "text-gray-400"}`}>{parseFloat(spentPercentage.toFixed(2))}%</div>
                </div>
                <IncomeSpent income={props.income} month={props.month} year={props.year} colors={props.colors} />
            </div>
            <div className="flex flex-col">
                <div className={`font-bold text-2xl ${totalAllocated.totalSpent > props.income ? "text-red-500" : ""}`}>{totalAllocated.totalSpent}€</div>
                <div className="font-bold text-gray-400 text-sm">of {props.income}€</div>
            </div>
        </CardContent>
    </Card>)
}