import AddBudgetPopover from "@/components/Budget/components/AddBudgetPopover";
import BudgetMonthPicker from "@/components/Budget/components/BudgetMonthPicker";


export default async function BudgetGroupLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <> 
        <div className="flex flex-row gap-10"><BudgetMonthPicker/><AddBudgetPopover/></div>
        <div>{children}</div>
    </>
}