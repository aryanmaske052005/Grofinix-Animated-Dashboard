"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ThemeToggle } from "@/components/theme-toggle"
import { KPIWidget } from "@/components/kpi-widget"
import { AnimatedChart } from "@/components/animated-chart"
import { Sidebar } from "@/components/sidebar"
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Menu,
} from "lucide-react"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedChart, setSelectedChart] = useState<"line" | "bar" | "pie">("line")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up" as const,
      icon: DollarSign,
      description: "from last month",
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180.1%",
      trend: "up" as const,
      icon: Users,
      description: "from last month",
    },
    {
      title: "Sales",
      value: "+12,234",
      change: "+19%",
      trend: "up" as const,
      icon: ShoppingCart,
      description: "from last month",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-4.3%",
      trend: "down" as const,
      icon: Activity,
      description: "from last month",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-balance">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back! Here's what's happening with your business today.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="animate-pulse-glow">
                Live Data
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, index) => (
              <div key={kpi.title} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                {isLoading ? (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-[120px] mb-2" />
                      <Skeleton className="h-3 w-[80px]" />
                    </CardContent>
                  </Card>
                ) : (
                  <KPIWidget {...kpi} />
                )}
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Chart */}
            <div className="lg:col-span-2">
              <Card className="animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Revenue Analytics</CardTitle>
                      <CardDescription>Monthly revenue trends and comparisons</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedChart === "line" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChart("line")}
                      >
                        <LineChart className="h-4 w-4 mr-1" />
                        Line
                      </Button>
                      <Button
                        variant={selectedChart === "bar" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChart("bar")}
                      >
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Bar
                      </Button>
                      <Button
                        variant={selectedChart === "pie" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChart("pie")}
                      >
                        <PieChart className="h-4 w-4 mr-1" />
                        Pie
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? <Skeleton className="h-[300px] w-full" /> : <AnimatedChart type={selectedChart} />}
                </CardContent>
              </Card>
            </div>

            {/* Side Charts */}
            <div className="space-y-6">
              <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-[200px] w-full" />
                  ) : (
                    <AnimatedChart type="pie" variant="traffic" />
                  )}
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Growth Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-[150px] w-full" />
                  ) : (
                    <AnimatedChart type="line" variant="growth" />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="animate-slide-in-up" style={{ animationDelay: "0.6s" }}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse" />
                      <span className="text-sm">New user registered</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse" />
                      <span className="text-sm">Payment processed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-chart-3 rounded-full animate-pulse" />
                      <span className="text-sm">Order completed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-chart-4 rounded-full animate-pulse" />
                      <span className="text-sm">Support ticket resolved</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="animate-slide-in-up" style={{ animationDelay: "0.8s" }}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[120px] w-full" />
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Server Response</span>
                      <span className="text-sm font-medium text-chart-3">98.5%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-chart-3 h-2 rounded-full w-[98.5%] transition-all duration-1000" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database</span>
                      <span className="text-sm font-medium text-chart-1">95.2%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-chart-1 h-2 rounded-full w-[95.2%] transition-all duration-1000" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="animate-slide-in-up" style={{ animationDelay: "1s" }}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
