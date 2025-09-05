"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  X,
  TrendingUp,
  ShoppingCart,
  FileText,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, current: true },
  { name: "Analytics", icon: BarChart3, current: false },
  { name: "Users", icon: Users, current: false },
  { name: "Sales", icon: ShoppingCart, current: false },
  { name: "Reports", icon: FileText, current: false },
  { name: "Growth", icon: TrendingUp, current: false },
]

const secondaryNavigation = [
  { name: "Settings", icon: Settings },
  { name: "Help", icon: HelpCircle },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">Dashboard</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant={item.current ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-all duration-200",
                    item.current
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t border-sidebar-border">
              <div className="space-y-1">
                {secondaryNavigation.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50">
              <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-sidebar-primary-foreground">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
