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
import { BudgetCardTitle } from "./budgetCardTitle"
import { Plus } from "lucide-react"

interface BudgetCardProps {
  budget: Budget
}


export function BudgetCard(props: BudgetCardProps) {
  return (
    <Card className="mx-4 my-4">
      <CardContent className=" p-4">
        <div></div>
      <Progress value={15} />
          <Button variant="ghost" name="Add" className="space-x-2"><Label>Transaction </Label><Plus /></Button>

      </CardContent>
    </Card>
  )
}