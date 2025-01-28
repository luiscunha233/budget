import BudgetGroupCard from "@/components/BudgetGroup/components/BudgetGroupCard";
import IncomeDisplay from "@/components/Income/IncomeDisplay";
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

    const budgetsGroups = await getBudgetGroupsInMonthService(year, month);
    const colorToDisplay = generateColorPallet(budgetsGroups.length, {hue: 64, saturation: 96, lightness: 42});
    return <>
        <IncomeDisplay month={month} year={year} colors={colorToDisplay}/>
        <div className="my-6 gap-4 flex flex-row flex-wrap">
            {budgetsGroups.map((budgetGroup,index) => <div className="basis-s"><BudgetGroupCard budgetGroup={budgetGroup} year={year} month={month} color={colorToDisplay[index]} /></div>)}
        </div>
    </>
}