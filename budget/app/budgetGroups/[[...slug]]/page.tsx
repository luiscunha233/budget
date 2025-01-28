import BudgetGroupCard from "@/components/BudgetGroup/components/BudgetGroupCard";
import IncomeDisplay from "@/components/Income/IncomeDisplay";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllBudgetGroups } from "@/lib/db/BudgetGroup"
import { getBudgetGroupsInMonthService } from "@/lib/service/BudgetGroupService";
import { populateDatabase } from "@/lib/service/test";
import { generateColorPallet } from "@/lib/utils";




export default async function BudgetGroupPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const paramLoaded = await params;
    const currentDate = new Date();
    let year = currentDate.getUTCFullYear();
    let month = currentDate.getUTCMonth() + 1;


    if (paramLoaded && paramLoaded.slug && paramLoaded.slug.length > 0) {
        year = parseInt(paramLoaded.slug[0]);
        month = parseInt(paramLoaded.slug[1]);
    }
    const income = 2300;
    const budgetsGroups = await getAllBudgetGroups();
    const colorToDisplay = generateColorPallet(budgetsGroups.length, { hue: 64, saturation: 96, lightness: 42 });
    return <>
        <IncomeDisplay budgetsGroups={budgetsGroups} income={income} month={month} year={year} colors={colorToDisplay} />
        <div className="flex flex-wrap my-6 gap-4">
            {budgetsGroups.map((budgetGroup, index) => <BudgetGroupCard budgetGroup={budgetGroup} year={year} month={month} color={colorToDisplay[index]} income={income} />)}
        </div>
    </>
}