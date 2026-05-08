"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Heart, Search, MessageCircle, Bell, Calendar,
  Settings, LogOut, ChevronLeft, ChevronRight, User, Home,
  Building2, TrendingUp, FileText, Users, CreditCard, Star,
  Menu, X, HelpCircle, BarChart3, Layers, Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BUYER_NAV = [
  { label: "Dashboard", href: "/buyer-dashboard", icon: LayoutDashboard },
  { label: "Favorites", href: "/buyer-dashboard/favorites", icon: Heart },
  { label: "Saved Searches", href: "/buyer-dashboard/saved-searches", icon: Search },
  { label: "My Inquiries", href: "/buyer-dashboard/inquiries", icon: MessageCircle },
  { label: "Property Requests", href: "/buyer-dashboard/property-requests", icon: FileText },
  { label: "Viewings", href: "/buyer-dashboard/viewings", icon: Calendar },
  { label: "Comparisons", href: "/buyer-dashboard/comparisons", icon: Layers },
  { label: "Messages", href: "/buyer-dashboard/messages", icon: MessageCircle },
  { label: "Notifications", href: "/buyer-dashboard/notifications", icon: Bell },
  { label: "My Reviews", href: "/buyer-dashboard/reviews", icon: Star },
  { label: "Payment History", href: "/buyer-dashboard/payments", icon: CreditCard },
];

const AGENT_NAV = [
  { label: "Dashboard", href: "/agent-dashboard", icon: LayoutDashboard },
  { label: "My Properties", href: "/agent-dashboard/properties", icon: Building2 },
  { label: "Inquiries", href: "/agent-dashboard/inquiries", icon: MessageCircle },
  { label: "Viewings", href: "/agent-dashboard/viewings", icon: Calendar },
  { label: "My Leads", href: "/agent-dashboard/leads", icon: Users },
  { label: "Buyer Database", href: "/agent-dashboard/buyer-database", icon: User },
  { label: "Messages", href: "/agent-dashboard/messages", icon: MessageCircle },
  { label: "Analytics", href: "/agent-dashboard/analytics", icon: BarChart3 },
  { label: "Commissions", href: "/agent-dashboard/commissions", icon: CreditCard },
  { label: "Marketing Tools", href: "/agent-dashboard/marketing-tools", icon: TrendingUp },
  { label: "Reports", href: "/agent-dashboard/reports", icon: FileText },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isAgent = pathname.startsWith("/agent-dashboard");
  const isBuilder = pathname.startsWith("/builder-dashboard");
  const isAdmin = pathname.startsWith("/admin-panel");

  const navItems = isAgent ? AGENT_NAV : BUYER_NAV;
  const dashLabel = isAgent ? "Agent Dashboard" : isBuilder ? "Builder Dashboard" : isAdmin ? "Admin Panel" : "Buyer Dashboard";

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-5 border-b border-cream-200",
        collapsed && "justify-center px-3"
      )}>
        <div className="w-8 h-8 flex-shrink-0">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="32" height="32" rx="7" fill="#0A1628"/>
            <path d="M6 19 L16 7 L26 19" fill="#C9A255"/>
            <rect x="9" y="18" width="14" height="11" rx="1.5" fill="white" opacity="0.92"/>
            <rect x="13.5" y="22" width="5" height="7" rx="1" fill="#0A1628" opacity="0.35"/>
            <rect x="10" y="19.5" width="3" height="3" rx="0.5" fill="#C9A255" opacity="0.6"/>
            <rect x="19" y="19.5" width="3" height="3" rx="0.5" fill="#C9A255" opacity="0.6"/>
          </svg>
        </div>
        {!collapsed && (
          <div>
            <div className="font-display font-bold tracking-[0.1em] text-navy-900 text-base leading-none">PLOTIX</div>
            <div className="text-gold-500 font-medium tracking-[0.3em] text-[6px] uppercase">REALITY</div>
          </div>
        )}
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-cream-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-sm flex-shrink-0">
              RK
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-navy-900 truncate">Rajesh Kumar</p>
              <p className="text-xs text-gray-400 truncate">{dashLabel}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 scroll-hide">
        <div className="px-3 space-y-0.5">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || (href !== "/buyer-dashboard" && href !== "/agent-dashboard" && pathname.startsWith(href));
            return (
              <Link key={href} href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  active
                    ? "bg-navy-900 text-white"
                    : "text-navy-600 hover:bg-cream-100 hover:text-navy-900",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? label : undefined}
              >
                <Icon size={16} className="flex-shrink-0" />
                {!collapsed && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </div>

        {!collapsed && (
          <>
            <div className="px-4 mt-4 mb-2">
              <p className="text-[10px] font-semibold text-gray-400 tracking-[0.1em] uppercase">Account</p>
            </div>
            <div className="px-3 space-y-0.5">
              {[
                { label: "Profile", href: pathname.split("/")[1] + "/profile", icon: User },
                { label: "Settings", href: pathname.split("/")[1] + "/preferences", icon: Settings },
                { label: "Help", href: "/faqs", icon: HelpCircle },
              ].map(({ label, href, icon: Icon }) => (
                <Link key={label} href={"/" + href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-navy-600 hover:bg-cream-100 hover:text-navy-900 transition-all">
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </div>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className={cn("border-t border-cream-200 p-3", collapsed && "flex justify-center")}>
        <button className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all w-full",
          collapsed && "justify-center w-auto"
        )}>
          <LogOut size={16} />
          {!collapsed && "Sign Out"}
        </button>
      </div>

      {/* Collapse toggle (desktop only) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-cream-300 rounded-full flex items-center justify-center text-gray-500 hover:text-navy-900 shadow-sm transition-all hidden lg:flex"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </>
  );

  return (
    <div className="flex h-screen bg-cream-50 overflow-hidden">
      {/* Sidebar — Desktop */}
      <aside className={cn(
        "hidden lg:flex flex-col bg-white border-r border-cream-200 relative flex-shrink-0 transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}>
        <SidebarContent />
      </aside>

      {/* Sidebar — Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white flex flex-col shadow-2xl">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-cream-100">
              <X size={16} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-cream-200 px-5 h-14 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-cream-100 text-navy-700"
            >
              <Menu size={18} />
            </button>
            <div>
              <h1 className="font-semibold text-sm text-navy-900">{dashLabel}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="btn-secondary text-xs px-3 py-1.5">
              <Home size={12} /> Back to Site
            </Link>
            <button className="relative p-2 rounded-lg hover:bg-cream-100 text-navy-600">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-500 rounded-full ring-1 ring-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-xs cursor-pointer hover:bg-navy-200 transition-colors">
              RK
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
