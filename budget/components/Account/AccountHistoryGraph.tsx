"use client"

import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Account, Transaction } from "@prisma/client"
import { format } from "ts-date/locale/en"
import { daysInMonth } from "@/lib/utils"

const chartConfig = {
  value: {
    label: "Balance",
    color: "hsl(128, 100.00%, 37.30%)",
  },
} satisfies ChartConfig

export function AccountHistoryGraph(props: { account: Account }) {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const days = daysInMonth(month, year);
  let data = [];
  let runningBalance = props.account.currentBalance ?? 0;

  // Work backwards from current balance through transactions
  for(let i = days; i >= 1; i--) {
    const dayTransactions = props.account.transactions
      ?.filter((transaction: Transaction) => new Date(transaction.date).getDate() === i)
      .reduce((total: number, transaction: Transaction) => total - transaction.value, 0) ?? 0; // Subtract to get previous balance
      
    runningBalance -= dayTransactions;
    data.unshift({ date: new Date(year, month-1, i), value: runningBalance });
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
