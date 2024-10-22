import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
    <Card className="w-[350px] mx-4 my-4">
      <CardHeader>
        <BudgetCardTitle budget={props.budget} />
      </CardHeader>
      <CardContent>
        <Progress value={1} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex justify-center w-full">
          <Button variant="ghost" name="Add" className="space-x-2"><Label>Transaction </Label><Plus /></Button>
        </div>
      </CardFooter>
    </Card>
  )
}