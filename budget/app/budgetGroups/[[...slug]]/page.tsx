import BudgetGroupCard from "@/components/BudgetGroup/components/BudgetGroupCard";
import { getAllBudgetGroups } from "@/lib/db/BudgetGroup"
import { populateDatabase } from "@/lib/service/test";



export default async function BudgetPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const budgetsGroups = await getAllBudgetGroups();
    const paramLoaded = await params;
    const currentDate = new Date();
    let year = currentDate.getUTCFullYear();
    let month = currentDate.getUTCMonth() + 1;

    if(paramLoaded && paramLoaded.slug && paramLoaded.slug.length > 0){
        year = parseInt(paramLoaded.slug[0]);
        month = parseInt(paramLoaded.slug[1]);
    }

    return <div className="my-6 gap-4 flex flex-row flex-wrap">
        {budgetsGroups.map((budgetGroup) => <div className="basis-s"><BudgetGroupCard budgetGroup={budgetGroup} year={year} month={month} /></div>)}
    </div>
}