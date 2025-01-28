import AddBudgetPopover from "@/components/Budget/components/AddBudgetPopover";
import BudgetMonthPicker from "@/components/Budget/components/BudgetMonthPicker";
import { ScrollArea } from "@/components/ui/scroll-area";



export default async function BudgetGroupLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <> 
      <ScrollArea className="h-[100%]">
        <div className="flex flex-row gap-10"><BudgetMonthPicker/></div>
        <div>{children}</div>        
      </ScrollArea>
    </>
}