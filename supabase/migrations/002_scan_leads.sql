-- ============================================================
-- Migration 002: Scan Lead Email Capture + Nurture Tracking
-- Run this in your Supabase SQL editor
-- ============================================================

-- ── scan_leads ────────────────────────────────────────────────
-- Created when a visitor enters their email after running a scan.
-- Tracks which nurture emails have been sent and when.

create table if not exists public.scan_leads (
  id             uuid primary key default gen_random_uuid(),
  email          text not null,
  scan_id        uuid references public.scans(id) on delete set null,
  score          integer,                    -- copied from scan at capture time
  url            text,                       -- scanned URL
  business_name  text,
  -- email sequence tracking
  email_1_sent_at  timestamptz,             -- immediate: full scan results
  email_2_sent_at  timestamptz,             -- day 1: problem agitation
  email_3_sent_at  timestamptz,             -- day 2: solution / soft pitch
  email_4_sent_at  timestamptz,             -- day 4: social proof / hard pitch
  email_5_sent_at  timestamptz,             -- day 7: last chance urgency
  -- conversion tracking
  converted_at   timestamptz,               -- set when they purchase the playbook
  unsubscribed_at timestamptz,              -- set if they opt out
  -- meta
  source         text default 'scan',       -- how they entered the funnel
  created_at     timestamptz not null default now()
);

-- Indexes
create index if not exists scan_leads_email_idx      on public.scan_leads (email);
create index if not exists scan_leads_created_at_idx on public.scan_leads (created_at);
create index if not exists scan_leads_scan_id_idx    on public.scan_leads (scan_id);

-- Prevent duplicate emails per scan (same person scanning twice)
create unique index if not exists scan_leads_email_scan_unique 
  on public.scan_leads (email, scan_id) 
  where scan_id is not null;

-- ── RLS ──────────────────────────────────────────────────────
alter table public.scan_leads enable row level security;
create policy "service role only" on public.scan_leads
  using (auth.role() = 'service_role');

-- ── Unsubscribe token table ──────────────────────────────────
-- One-click unsubscribe links use a secure token
create table if not exists public.unsubscribe_tokens (
  token    text primary key default encode(gen_random_bytes(24), 'hex'),
  lead_id  uuid not null references public.scan_leads(id) on delete cascade,
  used_at  timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists unsub_tokens_lead_idx on public.unsubscribe_tokens (lead_id);

alter table public.unsubscribe_tokens enable row level security;
create policy "service role only" on public.unsubscribe_tokens
  using (auth.role() = 'service_role');
