-- EngPulse initial schema
-- Run this in Supabase SQL editor or via supabase db push

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- 1. beta_requests
create table if not exists beta_requests (
  id                      uuid primary key default gen_random_uuid(),
  full_name               text not null,
  email                   text not null,
  company                 text not null,
  role                    text not null,
  team_size               text not null,
  current_reporting_method text,
  biggest_reporting_pain  text,
  would_send_to_ceo       boolean default false,
  preferred_language      text default 'en',
  selected_plan           text not null default 'Free Beta',
  status                  text not null default 'pending_email_verification'
                          check (status in (
                            'pending_email_verification',
                            'email_verified',
                            'active',
                            'expired',
                            'rejected'
                          )),
  email_verified_at       timestamptz,
  access_start_at         timestamptz,
  access_expires_at       timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create index if not exists beta_requests_email_idx on beta_requests(email);
create index if not exists beta_requests_status_idx on beta_requests(status);

-- 2. email_verification_tokens
create table if not exists email_verification_tokens (
  id               uuid primary key default gen_random_uuid(),
  beta_request_id  uuid not null references beta_requests(id) on delete cascade,
  email            text not null,
  token_hash       text not null unique,
  expires_at       timestamptz not null,
  used_at          timestamptz,
  created_at       timestamptz not null default now()
);

create index if not exists evt_beta_request_id_idx on email_verification_tokens(beta_request_id);
create index if not exists evt_token_hash_idx on email_verification_tokens(token_hash);

-- 3. access_sessions
create table if not exists access_sessions (
  id                uuid primary key default gen_random_uuid(),
  beta_request_id   uuid not null references beta_requests(id) on delete cascade,
  access_token_hash text not null unique,
  status            text not null default 'active'
                    check (status in ('active', 'expired', 'revoked')),
  expires_at        timestamptz not null,
  created_at        timestamptz not null default now(),
  last_seen_at      timestamptz not null default now()
);

create index if not exists as_beta_request_id_idx on access_sessions(beta_request_id);
create index if not exists as_access_token_hash_idx on access_sessions(access_token_hash);

-- 4. github_connections
create table if not exists github_connections (
  id                uuid primary key default gen_random_uuid(),
  beta_request_id   uuid not null references beta_requests(id) on delete cascade,
  provider          text not null default 'github',
  provider_user_id  text,
  provider_username text,
  provider_org      text,
  access_status     text not null default 'simulated'
                    check (access_status in ('connected', 'simulated', 'disconnected', 'failed')),
  scopes            text[],
  -- NOTE: do not store raw OAuth tokens; encrypt before storing if needed
  connected_at      timestamptz,
  disconnected_at   timestamptz,
  created_at        timestamptz not null default now()
);

create index if not exists gc_beta_request_id_idx on github_connections(beta_request_id);

-- 5. selected_repositories
create table if not exists selected_repositories (
  id                   uuid primary key default gen_random_uuid(),
  beta_request_id      uuid not null references beta_requests(id) on delete cascade,
  github_connection_id uuid references github_connections(id) on delete set null,
  repo_name            text not null,
  repo_full_name       text not null,
  provider             text not null default 'github',
  is_selected          boolean not null default true,
  created_at           timestamptz not null default now()
);

create index if not exists sr_beta_request_id_idx on selected_repositories(beta_request_id);

-- 6. pricing_inquiries
create table if not exists pricing_inquiries (
  id                    uuid primary key default gen_random_uuid(),
  full_name             text not null,
  email                 text not null,
  company               text not null,
  role                  text not null,
  selected_plan         text not null,
  team_size             text,
  repo_count            text,
  current_reporting_tool text,
  message               text,
  preferred_language    text default 'en',
  status                text not null default 'new'
                        check (status in ('new', 'contacted', 'qualified', 'closed_won', 'closed_lost')),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists pi_email_idx on pricing_inquiries(email);
create index if not exists pi_status_idx on pricing_inquiries(status);

-- 7. audit_events
create table if not exists audit_events (
  id          uuid primary key default gen_random_uuid(),
  event_type  text not null,
  entity_type text,
  entity_id   uuid,
  email       text,
  metadata    jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists ae_event_type_idx on audit_events(event_type);
create index if not exists ae_email_idx on audit_events(email);
create index if not exists ae_created_at_idx on audit_events(created_at desc);

-- Row Level Security: disable for service role access (API routes use service role)
alter table beta_requests         disable row level security;
alter table email_verification_tokens disable row level security;
alter table access_sessions       disable row level security;
alter table github_connections    disable row level security;
alter table selected_repositories disable row level security;
alter table pricing_inquiries     disable row level security;
alter table audit_events          disable row level security;
