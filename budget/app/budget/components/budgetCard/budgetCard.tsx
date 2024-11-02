"use client";

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Budget } from "@/model/model"
import { ResponsivePie } from '@nivo/pie'
import { BudgetPie } from "./budgetpie"
import { Progress } from "@/components/ui/progress"
import { BudgetCardContent } from "./budgetCardContent"
import { Plus } from "lucide-react"


interface BudgetCardProps {
  budget: Budget
}


export function BudgetCard(props: BudgetCardProps) {
  
  return (
    <Card className="mb-4 w-[calc(100%-15px)]">
      <BudgetCardContent budget={props.budget} />
    </Card>
  )
}