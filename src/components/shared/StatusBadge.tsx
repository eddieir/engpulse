import { cn, getHealthBg, getHealthLabel, getSeverityColor } from "@/lib/utils";
import type { HealthStatus, Severity } from "@/types";

interface HealthBadgeProps {
  status: HealthStatus;
  className?: string;
}

export function HealthBadge({ status, className }: HealthBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        getHealthBg(status),
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "healthy" && "bg-emerald-500",
          status === "watch" && "bg-amber-500",
          status === "at_risk" && "bg-orange-500",
          status === "critical" && "bg-red-500"
        )}
      />
      {getHealthLabel(status)}
    </span>
  );
}

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border capitalize",
        getSeverityColor(severity),
        className
      )}
    >
      {severity}
    </span>
  );
}

interface StatusDotProps {
  status: "green" | "yellow" | "red";
  className?: string;
}

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        "w-2.5 h-2.5 rounded-full flex-shrink-0",
        status === "green" && "bg-emerald-500",
        status === "yellow" && "bg-amber-500",
        status === "red" && "bg-red-500",
        className
      )}
    />
  );
}
