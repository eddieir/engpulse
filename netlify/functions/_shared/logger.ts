import { randomUUID } from "crypto";

export type LogLevel = "info" | "warn" | "error";

export interface LogEntry {
  level: LogLevel;
  requestId: string;
  fn: string;
  event: string;
  ts: string;
  [key: string]: unknown;
}

export function makeRequestId(): string {
  return `req_${randomUUID().replace(/-/g, "").slice(0, 10)}`;
}

export function createLogger(fn: string, requestId: string) {
  function write(level: LogLevel, event: string, data?: Record<string, unknown>) {
    const entry: LogEntry = {
      level,
      requestId,
      fn,
      event,
      ts: new Date().toISOString(),
      ...(data ?? {}),
    };
    const line = JSON.stringify(entry);
    if (level === "error") console.error(line);
    else if (level === "warn") console.warn(line);
    else console.info(line);
  }

  return {
    info: (event: string, data?: Record<string, unknown>) => write("info", event, data),
    warn: (event: string, data?: Record<string, unknown>) => write("warn", event, data),
    error: (event: string, data?: Record<string, unknown>) => write("error", event, data),
  };
}

export type Logger = ReturnType<typeof createLogger>;
