"use client"


import { Bar, BarChart, CartesianGrid, Line, LineChart, ReferenceLine, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Transaction } from "@prisma/client"
import { format } from "ts-date/locale/en"
import { daysInMonth } from "@/lib/utils"


const chartConfig = {
  value: {
    label: "Available",
    color: "hsl(128, 100.00%, 37.30%)",
  },
} satisfies ChartConfig

export function TransactionLineChart(props: {transactions: Transaction[], budgetGoal:number, months: number , year: number}){ 
    const days = daysInMonth(props.months, props.year);
    let data = [];  
    let totalAvailable = props.budgetGoal;
    for(let i = 1; i <= days; i++) {
        let totalTransactedAtDay = props.transactions
        .filter(transaction => new Date(transaction.dueDate).getDate() === i)
        .reduce((total, transaction) => total + transaction.value, 0);
        
        totalAvailable -= totalTransactedAtDay;
        data.push({ date: new Date(props.year, props.months-1, i), value: totalAvailable });
    }


  return (
    <ChartContainer config={chartConfig}>
    <LineChart
      accessibilityLayer
      data={data}
      margin={{
        left: 12,
        right: 12,
      }}
    >
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="date"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value) => format(new Date(value),"D/MM")?.toString() ?? ""}
      />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
      />
      <ReferenceLine y={0} label="" stroke="red" strokeDasharray="3 3" />
      <Line
        dataKey="value"
        type="basis"
        stroke="var(--color-value)"
        strokeWidth={2}
        dot={false}
        animationDuration={1000}
      />
    </LineChart>
  </ChartContainer>
  )
}
