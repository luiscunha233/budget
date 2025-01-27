"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
import { Budget } from "@prisma/client"


function parseBudgetData(budgets: Budget[], totalSpent: number, totalGoal: number) {
    let data = [];

    let config: ChartConfig = {};

    let colorIncrement = 360 / budgets.length;
    let color = 0;

    if (totalSpent < totalGoal) {
        colorIncrement = 360 / (budgets.length + 1);
    }

    for (const budget of budgets) {
        data.push({ name: budget.name, value: budget.goal, fill: `hsl(${color}, 95%, 42.5%)` });
        config[budget.name] = {
            label: budget.name,
            color: `hsl(${color}, 100%, 50%)`
        }
        color += colorIncrement;
    }

    if (totalSpent < totalGoal) {
        data.push({ name: "Remain", value: (totalGoal - totalSpent), fill: `hsl(0, 0%, 30%)` });
        config["Remain"] = {
            label: "Remain",
            color: `hsl(11, 3%, 28%)`
        }
    }

    return { data, config };
}

export function BudgetGroupPiechart(props: { budgets: Budget[], totalSpent: number, totalGoal: number }) {

    let { data: chartData, config: chartConfig } = parseBudgetData(props.budgets, props.totalSpent, props.totalGoal);

    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square min-h-[175px]"
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    strokeWidth={5}
                >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-xl font-bold"
                                        >
                                            {props.totalSpent}€
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground text-s"
                                        >
                                            of {props.totalGoal}€
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    )
}
