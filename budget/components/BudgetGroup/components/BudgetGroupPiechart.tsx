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
import { generateColorPallet, HSLColor, HSLColorToString } from "@/lib/utils"


function parseBudgetData(budgets: Budget[], totalSpent: number, totalGoal: number, colors : HSLColor[]) {
    let data = [];

    let config: ChartConfig = {};

    if(!budgets || budgets.length == 0 ){
        
        data.push({ name: "Remain", value: 0.000001, fill: `hsl(0, 0%, 30%)` });
        
        config["Remain"] = {
            label: "Remain",
            color: `hsl(11, 3%, 28%)`
        }
        return { data, config };
    }

    let colorPick = 0;
    for (const budget of budgets) {
        data.push({ name: budget.name, value: budget.goal, fill: HSLColorToString(colors[colorPick]) });
        config[budget.name] = {
            label: budget.name,
            color: HSLColorToString(colors[colorPick])
        }
        colorPick++;
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

export function BudgetGroupPiechart(props: { budgets: Budget[], totalSpent: number, totalGoal: number, colors : HSLColor[] }) {
    const totalSpent = props.totalSpent ? props.totalSpent : 0;
    const totalGoal = props.totalGoal ? props.totalGoal : 0;

    let { data: chartData, config: chartConfig } = parseBudgetData(props.budgets, totalSpent, props.totalGoal,props.colors);

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
                    animationDuration={800}
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
