"use client";

import React, { useCallback, useEffect,useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ComboxboxValue, DateCombobox } from "@/app/budget/components/dateCombobox";
import { Button } from "@/components/ui/button";
import {CalendarPlus, Plus,Trash2} from "lucide-react"
import { DataTable } from "@/components/DataTable";
import { BudgetCard } from "./components/budgetCard/budgetCard";
import { Label } from "@/components/ui/label";
import { ObjectId } from "mongodb";
import { Budget } from "@/model/model";
import { BudgetAddDialog } from "./dialogs/addBudgetDialog";

type Props = {};

function comboxDateMaper(entry:Budget){
  let entryDate = new Date(entry.startDate);
  return { 
    value : entry.startDate, 
    label: entryDate.toLocaleDateString(undefined,{month:"long",year:"numeric"})}
}
 
export default function BudgetPage({ }: Props) {

  const [data, setData] = useState<ComboxboxValue[]>([{value:new Date().toISOString(), label:new Date().toLocaleDateString(undefined,{month:"long",year:"numeric"})}]);
  const [budgets, setBudgets] = useState<Budget[]>();
  const [budgetType,setBudgetType] = useState<string>("all");
  const [budgetDate,setBudgetDate] = useState<string>();
  



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/budget/all');
      const responseData = await response.json();
      setBudgets(responseData as Budget[]);
      const newData = responseData.map(comboxDateMaper);

      newData.forEach((element: any) => {
        if(data.find((entry) => entry.label === element.label) === undefined){
          data.push(element);
        }
      });
      setData(data);
    };
    fetchData();
  }, [budgetDate,budgetType]);


  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="flex flex-row">
        <div className="flex basis-1"><DateCombobox data={data} onSelect={(value)=>setBudgetDate(value)} placeholder="Date" empty="Date"></DateCombobox></div>
      </div>
      <Tabs onValueChange={setBudgetType} defaultValue="all" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="incomes">Incomes</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="space-x-2">
        <BudgetAddDialog type={budgetType} date={budgetDate} setBudgets={setBudgets}/>

        </div>
      <div className="flex flex-wrap">
        {
          budgets?.map((budget) => {
            if(budgetType === budget.type || budgetType === "all"){
              return <BudgetCard budget={budget} />
            }
          })
        }
      </div>
    </div>
  );
}
