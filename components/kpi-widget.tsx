"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPIWidgetProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
  description: string
}

export function KPIWidget({ title, value, change, trend, icon: Icon, description }: KPIWidgetProps) {
  const isPositive = trend === "up"

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-balance">{value}</div>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            variant={isPositive ? "default" : "destructive"}
            className={cn(
              "flex items-center gap-1 text-xs",
              isPositive
                ? "bg-chart-3/10 text-chart-3 hover:bg-chart-3/20"
                : "bg-destructive/10 text-destructive hover:bg-destructive/20",
            )}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {change}
          </Badge>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
