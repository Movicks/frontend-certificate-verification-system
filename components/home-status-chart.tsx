"use client"

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"

interface HomeStatusChartProps {
  active: number
  revoked: number
  className?: string
}

export default function HomeStatusChart({ active, revoked, className }: HomeStatusChartProps) {
  return (
    <ChartContainer
      config={{
        Active: { label: "Active", color: "hsl(var(--primary))" },
        Revoked: { label: "Revoked", color: "hsl(var(--destructive))" },
      }}
      className={className || "h-[300px]"}
    >
      <PieChart>
        <Pie
          data={[
            { name: "Active", value: active },
            { name: "Revoked", value: revoked },
          ]}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          <Cell fill="hsl(var(--primary))" />
          <Cell fill="hsl(var(--destructive))" />
        </Pie>
        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
      </PieChart>
    </ChartContainer>
  )
}