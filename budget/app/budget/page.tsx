"use client"
import React, { useCallback, useEffect, useState } from "react";
import type { Budget, BudgetGroup } from '@prisma/client'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ComboxboxValue, DateCombobox } from "@/app/budget/components/dateCombobox";
import { newValidDate } from "ts-date/esm/locale/en";
import { BudgetList } from "./components/budgetCard/budgetList";
import { BudgetGroupAddDialog } from "./dialogs/addBudgetGroupDialog";
import { getAllBudgetGroups } from "@/server-functions/BudgetGroup";
import { BudgetTypeTabs } from "./components/budgetCard/typeTabs";

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
  const [budgetgroups, setBudgetGroups] = useState<(BudgetGroup & { budgets: Budget[] })[]>();
  const [budgetType, setBudgetType] = useState<string>("all");
  const [budgetDate, setBudgetDate] = useState<string>();

  const budgetGroupsCallback = useCallback((budgets: (BudgetGroup & { budgets: Budget[] })[]) => {
    setBudgetGroups(budgets);
  },[]);


  useEffect(() => {
    const fetchData = async () => {
      let budgetGroups = await getAllBudgetGroups();
      setBudgetGroups(budgetGroups);
      const existingDates = await fetch("/api/budget/uniquedates").then((res) => res.json());
      setComboxData(comboxDatesInitializer(existingDates));
    };
    fetchData();
  }, [budgetDate, budgetType]);

  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="flex flex-row">
        <div>
          <DateCombobox data={data} onSelect={(value) => setBudgetDate(value)} placeholder="Date" empty="Date" />
        </div>
      </div>
      <div className="flex flex-row space-x-5">
      <BudgetTypeTabs setBudgetType={setBudgetType} />
      <BudgetGroupAddDialog type={budgetType} date={budgetDate} setBudgetGroups={budgetGroupsCallback} />
      </div>
      <BudgetList budgetGroups={budgetgroups ?? []} budgetType={budgetType} />
    </div>
  );
}
