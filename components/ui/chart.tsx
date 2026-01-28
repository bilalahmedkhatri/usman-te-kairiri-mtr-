"use client"

import * as React from "react"
import {
  Area,
  Bar,
  Cell,
  Line,
  Pie,
  RadialBar,
  Rectangle,
  ResponsiveContainer,
} from "recharts"
import {
  AreaChart as AreaChartPrimitive,
  BarChart as BarChartPrimitive,
  LineChart as LineChartPrimitive,
  PieChart as PieChartPrimitive,
  RadarChart as RadarChartPrimitive,
  RadialBarChart as RadialBarChartPrimitive,
  ScatterChart as ScatterChartPrimitive,
} from "recharts"

import { cn } from "@/lib/utils"

// Chart Container
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: any
    children: React.ComponentProps<
      typeof ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, ...props }, ref) => {
  const chartContainerId = `chart-container-${id}`

  return (
    <div
      data-chart-container-id={chartContainerId}
      ref={ref}
      className={cn(
        "has-[[data-chart-layout=stack]]:flex-col has-[[data-chart-layout=stack]]:gap-y-1 [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-reference-line_line]:stroke-border [&_.recharts-sector[path*='--foreground']]:fill-foreground [&_.recharts-sector[path*='--primary']]:fill-primary [&_.recharts-sector[path*='--secondary']]:fill-secondary [&_.recharts-sector[path*='--muted']]:fill-muted [&_.recharts-sector[path*='--destructive']]:fill-destructive [&_.recharts-layer:has(>path[stroke='var(--color-foreground)']):not(:has(>path[fill='var(--color-foreground)']))]:[stroke-width:1] [&_.recharts-layer:has(>path[stroke='var(--color-foreground)']):not(:has(>path[fill='var(--color-foreground)']))]:[fill:none] [&_.recharts-layer:has(>path[stroke='var(--color-primary)']):not(:has(>path[fill='var(--color-primary)']))]:[stroke-width:2] [&_.recharts-layer:has(>path[stroke='var(--color-primary)']):not(:has(>path[fill='var(--color-primary)']))]:[fill:none] [&_.recharts-layer:has(>path[stroke='var(--color-secondary)']):not(:has(>path[fill='var(--color-secondary)']))]:[stroke-width:2] [&_.recharts-layer:has(>path[stroke='var(--color-secondary)']):not(:has(>path[fill='var(--color-secondary)']))]:[fill:none] [&_.recharts-layer:has(>path[stroke='var(--color-muted)']):not(:has(>path[fill='var(--color-muted)']))]:[stroke-width:2] [&_.recharts-layer:has(>path[stroke='var(--color-muted)']):not(:has(>path[fill='var(--color-muted)']))]:[fill:none] [&_.recharts-layer:has(>path[stroke='var(--color-destructive)']):not(:has(>path[fill='var(--color-destructive)']))]:[stroke-width:2] [&_.recharts-layer:has(>path[stroke='var(--color-destructive)']):not(:has(>path[fill='var(--color-destructive)']))]:[fill:none] flex aspect-video justify-center text-xs",
        className
      )}
      {...props}
    >
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  )
})
ChartContainer.displayName = "Chart"

// Chart Legend
const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      data-slot="chart-legend"
      ref={ref}
      className={cn("flex items-center justify-end gap-x-4", className)}
      {...props}
    />
  )
})
ChartLegend.displayName = "ChartLegend"

const ChartLegendItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    name: string
    color: string
  }
>(({ className, name, color, ...props }, ref) => {
  return (
    <div
      data-slot="chart-legend-item"
      ref={ref}
      className={cn("flex items-center gap-x-2", className)}
      {...props}
    >
      <div
        className="size-2 shrink-0 rounded-[2px]"
        style={{
          backgroundColor: color,
        }}
      />
      <div className="flex-1 text-muted-foreground">{name}</div>
    </div>
  )
})
ChartLegendItem.displayName = "ChartLegendItem"

// Chart Tooltip
const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "min-w-32 grid items-center gap-1 rounded-lg border bg-background/95 p-2 text-sm shadow-lg",
        className
      )}
      {...props}
    />
  )
})
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipRow = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    color: string
  }
>(({ color, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between", className)}
      {...props}
    />
  )
})
ChartTooltipRow.displayName = "ChartTooltipRow"

const ChartTooltipCell = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    color: string
  }
>(({ color, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-x-2 [&>svg]:size-2.5",
        className
      )}
      {...props}
    />
  )
})
ChartTooltipCell.displayName = "ChartTooltipCell"

const ChartTooltipLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("font-medium text-muted-foreground", className)}
      {...props}
    />
  )
})
ChartTooltipLabel.displayName = "ChartTooltipLabel"

const ChartTooltipValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("font-bold text-foreground", className)}
      {...props}
    />
  )
})
ChartTooltipValue.displayName = "ChartTooltipValue"

const ChartTooltipIndicator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    color: string
  }
>(({ color, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("size-2 shrink-0 rounded-[2px]", className)}
      style={{
        backgroundColor: color,
      }}
      {...props}
    />
  )
})
ChartTooltipIndicator.displayName = "ChartTooltipIndicator"

const AreaChart = AreaChartPrimitive
const BarChart = BarChartPrimitive
const LineChart = LineChartPrimitive
const PieChart = PieChartPrimitive
const RadarChart = RadarChartPrimitive
const RadialBarChart = RadialBarChartPrimitive
const ScatterChart = ScatterChartPrimitive

const Chart = Object.assign(ChartContainer, {
  Legend: ChartLegend,
  LegendItem: ChartLegendItem,
  Tooltip: ChartTooltip,
  TooltipRow: ChartTooltipRow,
  TooltipCell: ChartTooltipCell,
  TooltipLabel: ChartTooltipLabel,
  TooltipValue: ChartTooltipValue,
  TooltipIndicator: ChartTooltipIndicator,
  AreaChart: AreaChart,
  BarChart: BarChart,
  LineChart: LineChart,
  PieChart: PieChart,
  RadarChart: RadarChart,
  RadialBarChart: RadialBarChart,
  ScatterChart: ScatterChart,
  ChartContainer: ChartContainer,
})

export {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartLegendItem,
  ChartTooltip,
  ChartTooltipRow,
  ChartTooltipCell,
  ChartTooltipLabel,
  ChartTooltipValue,
  ChartTooltipIndicator,
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  ScatterChart,
  //
  Area,
  Bar,
  Cell,
  Line,
  Pie,
  RadialBar,
  Rectangle,
}
