"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GitBranch,
  FileText,
  AlertTriangle,
  TrendingUp,
  Settings,
  Zap,
  ChevronRight,
  ShieldCheck,
  Flag,
} from "lucide-react";
import { usePersona } from "@/contexts/PersonaContext";
import { mockBlockers } from "@/lib/mock-data";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/repositories", label: "Repositories", icon: GitBranch },
  { href: "/dashboard/report", label: "Weekly Report", icon: FileText },
  { href: "/dashboard/blockers", label: "Blockers", icon: AlertTriangle },
  { href: "/dashboard/quality", label: "QA & CI/CD", icon: ShieldCheck },
  { href: "/dashboard/release", label: "Release Readiness", icon: Flag },
  { href: "/dashboard/trends", label: "Trends", icon: TrendingUp },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const blockerCount = mockBlockers.filter((b) => b.severity === "high" || b.severity === "medium").length;

export function Sidebar() {
  const pathname = usePathname();
  const { persona, setPersona } = usePersona();

  return (
    <aside className="hidden lg:flex flex-col w-60 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 h-16 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-bold text-lg text-slate-900 dark:text-white">EngPulse</span>
      </div>

      {/* Workspace */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">Acme Cloud</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Starter plan</p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-auto" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <item.icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500")} />
              {item.label}
              {item.label === "Blockers" && blockerCount > 0 && (
                <span className="ml-auto flex-shrink-0 text-xs bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-full font-medium">{blockerCount}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Persona Switcher */}
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-2">View As</p>
        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <button
            onClick={() => setPersona("leadership")}
            className={cn(
              "flex-1 py-1.5 transition-colors",
              persona === "leadership"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
            )}
          >
            Leadership
          </button>
          <button
            onClick={() => setPersona("manager")}
            className={cn(
              "flex-1 py-1.5 transition-colors",
              persona === "manager"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
            )}
          >
            Manager
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">A</div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-900 dark:text-white truncate">Alex Morgan</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">alex@acmecloud.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
