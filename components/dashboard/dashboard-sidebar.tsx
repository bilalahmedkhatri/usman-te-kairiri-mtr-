"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Menu,
  X 
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function DashboardSidebar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const pathname = usePathname();

  const sidebarItems: SidebarItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Inventory", href: "/dashboard/inventory", icon: <Package className="w-4 h-4" /> },
    { label: "Orders", href: "/dashboard/orders", icon: <ShoppingCart className="w-4 h-4" /> },
    { label: "Customers", href: "/dashboard/customers", icon: <Users className="w-4 h-4" /> },
    { label: "Reports", href: "/dashboard/reports", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: "16rem",
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 h-screen bg-background border-r border-border shadow-lg md:shadow-none",
          "flex flex-col transition-all duration-300 ease-in-out",
          "w-64 md:w-64",
          "pt-20 md:pt-4"
        )}
      >
        {/* Close button for mobile */}
        <div className="md:hidden p-4 pb-2 flex justify-end">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map((item, index) => (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => isOpen && toggleSidebar()} // Close sidebar on mobile after clicking
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    pathname === item.href 
                      ? "bg-primary/10 text-primary hover:bg-primary/10" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border">
          <Button asChild variant="outline" className="w-full">
            <Link href="/signout">Sign out</Link>
          </Button>
        </div>
      </motion.aside>
    </>
  );
}

export function MobileSidebarToggle({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleSidebar}
      className="md:hidden fixed top-4 left-4 z-50"
    >
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </Button>
  );
}