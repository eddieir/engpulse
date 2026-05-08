export interface EnvValidation {
  ok: boolean;
  missing: string[];
}

export function validateEnv(keys: string[]): EnvValidation {
  const missing = keys.filter((k) => !process.env[k]);
  return { ok: missing.length === 0, missing };
}

// Hard-fail: without these, no DB operations can succeed
export function validateDatabaseEnv(): EnvValidation {
  return validateEnv(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"]);
}

// Optional: missing means email is skipped, not a fatal error
export function validateEmailEnv(): EnvValidation {
  return validateEnv(["RESEND_API_KEY", "EMAIL_FROM"]);
}

// Optional: PRICING_TEAM_EMAIL is additional for pricing internal notifications
export function validatePricingEmailEnv(): EnvValidation {
  return validateEnv(["RESEND_API_KEY", "EMAIL_FROM", "PRICING_TEAM_EMAIL"]);
}

// Soft-fail: missing means email links use a fallback URL
export function validateSiteUrlEnv(): EnvValidation {
  return validateEnv(["NEXT_PUBLIC_SITE_URL"]);
}

export const ENV_DB = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"] as const;
export const ENV_EMAIL = ["RESEND_API_KEY", "EMAIL_FROM"] as const;
export const ENV_SITE = ["NEXT_PUBLIC_SITE_URL"] as const;
export const ENV_PRICING_EMAIL = ["RESEND_API_KEY", "EMAIL_FROM", "PRICING_TEAM_EMAIL"] as const;
