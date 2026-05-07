"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { cn } from "@/lib/utils";
import { mockWeeklyMetrics } from "@/lib/mock-data";

const tabs = [
  { id: "shipping", label: "Shipping" },
  { id: "review", label: "Review Speed" },
  { id: "bugs", label: "Bug Pressure" },
  { id: "blocked", label: "Blocked Work" },
];

const chartConfigs = {
  shipping: {
    dataKey: "shippedUpdates",
    label: "Shipped updates",
    color: "#3b82f6",
    type: "area" as const,
    description: "Number of merged pull requests and releases shipped each week.",
  },
  review: {
    dataKey: "reviewBottlenecks",
    label: "Stuck PRs",
    color: "#f59e0b",
    type: "bar" as const,
    description: "Pull requests waiting more than 48 hours for review.",
  },
  bugs: {
    dataKey: "openBugs",
    label: "Open bugs",
    color: "#ef4444",
    type: "area" as const,
    description: "Total open bug reports across all monitored repositories.",
  },
  blocked: {
    dataKey: "blockers",
    label: "Active blockers",
    color: "#8b5cf6",
    type: "bar" as const,
    description: "Active blockers impacting delivery across the organization.",
  },
};

function CustomTooltip({
  active,
  payload,
  label,
  description,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  description: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-lg max-w-xs">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-0.5">{label}</p>
        <p className="text-lg font-bold text-slate-900 dark:text-white">{payload[0].value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>
    );
  }
  return null;
}

export function TrendChart() {
  const [activeTab, setActiveTab] = useState("shipping");
  const config = chartConfigs[activeTab as keyof typeof chartConfigs];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-0.5">4-Week Trends</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{config.description}</p>
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex gap-1 mb-6 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              activeTab === tab.id
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          {config.type === "area" ? (
            <AreaChart data={mockWeeklyMetrics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config.color} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={config.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:[stroke:#334155]" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip description={config.description} />} />
              <Area
                type="monotone"
                dataKey={config.dataKey}
                stroke={config.color}
                strokeWidth={2}
                fill="url(#colorGradient)"
                dot={{ fill: config.color, r: 4, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </AreaChart>
          ) : (
            <BarChart data={mockWeeklyMetrics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:[stroke:#334155]" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip description={config.description} />} />
              <Bar dataKey={config.dataKey} fill={config.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
