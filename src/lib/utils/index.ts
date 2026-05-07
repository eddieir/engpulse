import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { HealthStatus, Severity } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHealthColor(status: HealthStatus): string {
  switch (status) {
    case "healthy":
      return "text-emerald-600 dark:text-emerald-400";
    case "watch":
      return "text-amber-600 dark:text-amber-400";
    case "at_risk":
      return "text-orange-600 dark:text-orange-400";
    case "critical":
      return "text-red-600 dark:text-red-400";
  }
}

export function getHealthBg(status: HealthStatus): string {
  switch (status) {
    case "healthy":
      return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
    case "watch":
      return "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    case "at_risk":
      return "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800";
    case "critical":
      return "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
  }
}

export function getHealthLabel(status: HealthStatus): string {
  switch (status) {
    case "healthy":
      return "Healthy";
    case "watch":
      return "Watch";
    case "at_risk":
      return "At Risk";
    case "critical":
      return "Critical";
  }
}

export function getSeverityColor(severity: Severity): string {
  switch (severity) {
    case "high":
      return "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
    case "medium":
      return "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    case "low":
      return "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
  }
}

export function getBoardAnswerColor(
  status: "green" | "yellow" | "red"
): string {
  switch (status) {
    case "green":
      return "text-emerald-600 dark:text-emerald-400";
    case "yellow":
      return "text-amber-600 dark:text-amber-400";
    case "red":
      return "text-red-600 dark:text-red-400";
  }
}

export function getScoreColor(score: number): string {
  if (score >= 85) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 70) return "text-amber-600 dark:text-amber-400";
  if (score >= 50) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

export function getScoreStatus(score: number): HealthStatus {
  if (score >= 85) return "healthy";
  if (score >= 70) return "watch";
  if (score >= 50) return "at_risk";
  return "critical";
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
