import BudgetMonthPicker from "@/components/Budget/components/BudgetMonthPicker";


export default async function BudgetLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <> 
        <div><BudgetMonthPicker/></div>
        <div>{children}</div>
    </>
}