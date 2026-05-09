"use client";

import * as React from "react";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Scissors, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  active?: string;
}

export function Sidebar({ active }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Calendar", icon: CalendarDays, href: "/calendar" },
    { name: "Services", icon: Scissors, href: "/services" },
    { name: "Clients", icon: Users, href: "/clients" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside className="w-64 border-r border-outline-variant bg-surface flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-primary tracking-tight">Sentobar</h1>
        <p className="text-[10px] font-semibold text-outline tracking-wider uppercase mt-1">Master Barber Console</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = active ? active === item.name : pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                ? "bg-secondary-container/10 text-secondary border-r-4 border-secondary font-semibold" 
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-secondary" : "text-on-surface-variant"}`} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-outline-variant space-y-1">
        <Button variant="premium" className="w-full justify-start gap-3 h-12 mb-4" size="default">
          <Plus className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider font-bold">New Appointment</span>
        </Button>
        
        <Link href="#" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors text-sm">
          <HelpCircle className="w-5 h-5" />
          <span>Support</span>
        </Link>
        <Link href="/login" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-error transition-colors text-sm text-error">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
