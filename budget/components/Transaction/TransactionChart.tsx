"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
import { Value } from "@radix-ui/react-select"

const chartConfig = {
  value: {
    label: "Spent",
    color: "hsl(128, 100.00%, 37.30%)",
  },
} satisfies ChartConfig

export function TransactionChart(props: {transactions: Transaction[], months: number , year: number}){ 
    const days = daysInMonth(props.months, props.year);
    console.log(days);
    let data = [];  
    for(let i = 1; i <= days; i++) {
        let totalTransactedAtDay = props.transactions
        .filter(transaction => new Date(transaction.dueDate).getDate() === i)
        .reduce((total, transaction) => total + transaction.value, 0);
        
        data.push({ date: new Date(props.year, props.months-1, i), value: totalTransactedAtDay });
    }

    console.log(data);

  return (
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              tickFormatter={(value) => format(new Date(value),"D/MM")?.toString() ?? ""}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={4} barSize={4} />
          </BarChart>
        </ChartContainer>
  )
}
