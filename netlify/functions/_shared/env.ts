export interface EnvValidation {
  ok: boolean;
  missing: string[];
}

export function validateEnv(keys: string[]): EnvValidation {
  const missing = keys.filter((k) => !process.env[k]);
  return { ok: missing.length === 0, missing };
}

export const ENV_DB = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

export const ENV_EMAIL = [
  "RESEND_API_KEY",
  "EMAIL_FROM",
] as const;

export const ENV_SITE = ["NEXT_PUBLIC_SITE_URL"] as const;

export const ENV_ALL = [
  ...ENV_DB,
  ...ENV_EMAIL,
  "NEXT_PUBLIC_SITE_URL",
  "PRICING_TEAM_EMAIL",
] as const;
