"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { month: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
  { month: "Mar", revenue: 2000, expenses: 9800, profit: -7800 },
  { month: "Apr", revenue: 2780, expenses: 3908, profit: -1128 },
  { month: "May", revenue: 1890, expenses: 4800, profit: -2910 },
  { month: "Jun", revenue: 2390, expenses: 3800, profit: -1410 },
  { month: "Jul", revenue: 3490, expenses: 4300, profit: -810 },
  { month: "Aug", revenue: 4000, expenses: 2400, profit: 1600 },
  { month: "Sep", revenue: 3000, expenses: 1398, profit: 1602 },
  { month: "Oct", revenue: 2000, expenses: 9800, profit: -7800 },
  { month: "Nov", revenue: 2780, expenses: 3908, profit: -1128 },
  { month: "Dec", revenue: 1890, expenses: 4800, profit: -2910 },
]

const trafficData = [
  { name: "Direct", value: 400, color: "hsl(var(--chart-1))" },
  { name: "Social Media", value: 300, color: "hsl(var(--chart-2))" },
  { name: "Email", value: 200, color: "hsl(var(--chart-3))" },
  { name: "Referral", value: 100, color: "hsl(var(--chart-4))" },
]

const growthData = [
  { month: "Jan", growth: 20 },
  { month: "Feb", growth: 35 },
  { month: "Mar", growth: 25 },
  { month: "Apr", growth: 45 },
  { month: "May", growth: 60 },
  { month: "Jun", growth: 55 },
]

interface AnimatedChartProps {
  type: "line" | "bar" | "pie"
  variant?: "default" | "traffic" | "growth"
}

export function AnimatedChart({ type, variant = "default" }: AnimatedChartProps) {
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    expenses: {
      label: "Expenses",
      color: "hsl(var(--chart-2))",
    },
    profit: {
      label: "Profit",
      color: "hsl(var(--chart-3))",
    },
  }

  if (variant === "traffic" && type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={trafficData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            animationBegin={0}
            animationDuration={1000}
          >
            {trafficData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  if (variant === "growth" && type === "line") {
    return (
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={growthData}>
          <Line
            type="monotone"
            dataKey="growth"
            stroke="hsl(var(--chart-3))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
            animationDuration={1500}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke={chartConfig.revenue.color}
            strokeWidth={3}
            dot={{ fill: chartConfig.revenue.color, strokeWidth: 2, r: 4 }}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke={chartConfig.expenses.color}
            strokeWidth={3}
            dot={{ fill: chartConfig.expenses.color, strokeWidth: 2, r: 4 }}
            animationDuration={1500}
            animationBegin={300}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="revenue" fill={chartConfig.revenue.color} radius={[4, 4, 0, 0]} animationDuration={1000} />
          <Bar
            dataKey="expenses"
            fill={chartConfig.expenses.color}
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
            animationBegin={200}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (type === "pie") {
    const pieData = [
      { name: "Revenue", value: 45000, color: chartConfig.revenue.color },
      { name: "Expenses", value: 30000, color: chartConfig.expenses.color },
      { name: "Profit", value: 15000, color: chartConfig.profit.color },
    ]

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={1200}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return null
}
