"use client";

import React, { useCallback, useEffect,useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ComboxboxValue, DateCombobox } from "@/app/budget/dateCombobox";
import { Button } from "@/components/ui/button";
import {CalendarPlus, Plus,Trash2} from "lucide-react"
import { DataTable } from "@/components/DataTable";
import { BudgetCard } from "./budgetCard";
import { Label } from "@/components/ui/label";
import { ObjectId } from "mongodb";
import { Budget } from "@/model/model";
import { BudgetAddDialog } from "./addBudgetDialog";

type Props = {};

function comboxDateMaper(entry:Budget){
  let entryDate = new Date(entry.startDate);
  return { 
    value : entry.startDate, 
    label: entryDate.toLocaleDateString(undefined,{month:"long",year:"numeric"})}
}
 
export default function BudgetPage({ }: Props) {

  const [data, setData] = useState<ComboxboxValue[]>();
  const [budgets, setBudgets] = useState<Budget[]>();
  const [budgetType,setBudgetType] = useState<string>("income");
  const [budgetDate,setBudgetDate] = useState<string>();



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/budget/all');
      const data = await response.json();
      setBudgets(data as Budget[]);
      setData(data.map(comboxDateMaper));
    };
    fetchData();
  }, []);


  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="flex flex-row">
        <div className="flex basis-1"><DateCombobox data={data} onSelect={(value)=>setBudgetDate(value)} placeholder="Date" empty="Date"></DateCombobox></div>
      </div>
      <Tabs onValueChange={setBudgetType} defaultValue="income" className="w-[300px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="space-x-2">
        <BudgetAddDialog type={budgetType} date={budgetDate} />
        <Button variant="ghost" name="Remove" className="space-x-2"><Label>Remove</Label><Trash2/></Button>
        </div>
      <div className="flex flex-wrap">
        {budgetType} {budgetDate} 
        {/*<BudgetCard></BudgetCard>*/}
      </div>
    </div>
  );
}
