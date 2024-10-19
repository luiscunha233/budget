"use client";

import React, { useCallback, useEffect,useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import {CalendarPlus, Plus,Trash2} from "lucide-react"
import { DataTable } from "@/components/DataTable";
import { BudgetCard } from "./budgetCard";
import { Label } from "@/components/ui/label";
import { ObjectId } from "mongodb";

type Props = {};

interface Fact {
  _id: ObjectId
  fact: string
}

async function setFact(){

      fetch('/api/budget/add', {
        method: 'POST',
        body: JSON.stringify({
          test:"test"
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })

}

 
export default function BudgetPage({ }: Props) {

  const [data, setData] = useState<Fact>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/income');
      const data = await response.json();
      setData(data[0]);
    };
    fetchData();
  }, []);


  return (
    <div className="flex flex-col gap-5  w-full">
      <Label>{data?.fact}</Label>
      <div className="flex flex-row">
        <div className="flex basis-1 "><Combobox data={[]} placeholder="Date"></Combobox></div>
        <div className="flex basis-1" > <Button variant="ghost" name="Add"><CalendarPlus/></Button></div>
      </div>
      <Tabs defaultValue="income" className="w-[300px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="space-x-2">
        <Button variant="ghost" name="Add" className="space-x-2" onClick={()=>setFact()}><Label>Add</Label><Plus/></Button>
        <Button variant="ghost" name="Remove" className="space-x-2"><Label>Remove</Label><Trash2/></Button>
        </div>
      <div className="flex flex-wrap">
        <BudgetCard></BudgetCard>
        <BudgetCard></BudgetCard>
        <BudgetCard></BudgetCard>
        <BudgetCard></BudgetCard>
      </div>
    </div>
  );
}
