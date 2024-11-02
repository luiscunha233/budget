"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ComboxboxValue, DateCombobox } from "@/app/budget/components/dateCombobox";
import { Button } from "@/components/ui/button";
import { CalendarPlus, Plus, Trash2 } from "lucide-react"
import { DataTable } from "@/components/DataTable";
import { BudgetCard } from "./components/budgetCard/budgetCard";
import { Label } from "@/components/ui/label";
import { ObjectId } from "mongodb";
import { Budget, BudgetGroup } from "@/model/model";
import { BudgetAddDialog } from "./dialogs/addBudgetDialog";
import { parse, newValidDate } from "ts-date/esm/locale/en";
import { BudgetList } from "./components/budgetCard/budgetList";

type Props = {};



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


export default function BudgetPage({ }: Props) {

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
      <Tabs onValueChange={setBudgetType} defaultValue="all" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="incomes">Incomes</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="space-x-2">
        {/*<BudgetAddDialog type={budgetType} date={budgetDate} setBudgets={setBudgets} />*/}

      </div>
      <BudgetList budgetGroups={budgetgroups} budgetType={budgetType} />
    </div>
  );
}
