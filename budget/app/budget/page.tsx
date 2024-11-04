"use client";

import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ComboxboxValue, DateCombobox } from "@/app/budget/components/dateCombobox";
import { BudgetGroup } from "@/model/model";
import { newValidDate } from "ts-date/esm/locale/en";
import { BudgetList } from "./components/budgetCard/budgetList";
import { BudgetAddDialog } from "./dialogs/addBudgetDialog";

function comboxDatesInitializer(loadedDates: ComboxboxValue[]) {

  const date = newValidDate();

  const dates : any[] = [];

  loadedDates.forEach((loadedDate) => {
    if (dates.find((entry) => entry.label === loadedDate.label) === undefined) {
      dates.push(loadedDate);
    }
  });

  for(let i = 0; i < 6; i++) {
    let newDate = new Date(date.getFullYear(), (date.getMonth() + i) % 12);
    let newEntry = { value: newDate?.toISOString(), label: newDate?.toLocaleDateString(undefined, { month: "long", year: "numeric" }) };
    if (dates.find((entry) => entry.label === newEntry.label) === undefined) {
      dates.push(newEntry);
    }
  }

  return dates;
}


export default function BudgetPage() {

  const [data, setComboxData] = useState<ComboxboxValue[]>([]);
  const [budgetgroups, setBudgetGroups] = useState<BudgetGroup[]>();
  const [budgetType, setBudgetType] = useState<string>("all");
  const [budgetDate, setBudgetDate] = useState<string>();




  useEffect(() => {
    const fetchData = async () => {
      let budgetGroups = await getAllBudgetGroups();
      setBudgetGroups(budgetGroups as BudgetGroup[]);
      const existingDates = await fetch("/api/budget/uniquedates").then((res) => res.json());
      setComboxData(comboxDatesInitializer(existingDates));
    };
    fetchData();
  }, [budgetDate, budgetType]);


  async function getAllBudgetGroups(): Promise<BudgetGroup[]> {
    const response = await fetch('/api/budgetgroup/all');
    const responseData = await response.json();
    return responseData as BudgetGroup[];
  }

  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="flex flex-row">
        <div>
          <DateCombobox data={data} onSelect={(value) => setBudgetDate(value)} placeholder="Date" empty="Date" />
        </div>
      </div>
      <div className="flex flex-row space-x-5">
      <Tabs onValueChange={setBudgetType} defaultValue="all" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="incomes">Incomes</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
        </TabsList>
      </Tabs>
      <BudgetAddDialog type={budgetType} date={budgetDate} setBudgets={()=>{}} />
      </div>
      <BudgetList budgetGroups={budgetgroups} budgetType={budgetType} />
    </div>
  );
}
