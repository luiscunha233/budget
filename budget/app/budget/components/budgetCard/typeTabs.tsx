"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface BudgetTypeTabsProps {  
    setBudgetType : (value : string) => void
}

export function BudgetTypeTabs(props : BudgetTypeTabsProps){
    return <Tabs onValueChange={props.setBudgetType} defaultValue="all" className="w-[400px]">
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger value="expenses">Expenses</TabsTrigger>
      <TabsTrigger value="incomes">Incomes</TabsTrigger>
      <TabsTrigger value="investments">Investments</TabsTrigger>
    </TabsList>
  </Tabs>
}