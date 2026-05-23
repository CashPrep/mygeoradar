-- ============================================================
-- Migration 001: AI Readiness Scan + Report Purchases
-- Run this in your Supabase SQL editor
-- ============================================================

-- ── 1. scans ─────────────────────────────────────────────────
-- Stores every scan result. Free users get score/labels only.
-- The full `checks` JSON (with detail + fix) is server-side only.

create table if not exists public.scans (
  id            uuid primary key default gen_random_uuid(),
  url           text not null,
  business_name text,
  score         integer not null check (score >= 0 and score <= 100),
  checks        jsonb not null,   -- full check data including detail + fix
  created_at    timestamptz not null default now()
);

-- Index for lookups by URL (rate limiting, deduplication)
create index if not exists scans_url_idx on public.scans (url);
create index if not exists scans_created_at_idx on public.scans (created_at desc);

-- ── 2. report_purchases ──────────────────────────────────────
-- Created when Stripe confirms payment.
-- `token` is the secret used in /report/[token] URL.

create table if not exists public.report_purchases (
  id                 uuid primary key default gen_random_uuid(),
  scan_id            uuid not null references public.scans(id) on delete cascade,
  stripe_session_id  text not null unique,
  token              text not null unique default encode(gen_random_bytes(32), 'hex'),
  email              text,
  paid_at            timestamptz,
  created_at         timestamptz not null default now()
);

create index if not exists report_purchases_scan_id_idx  on public.report_purchases (scan_id);
create index if not exists report_purchases_token_idx    on public.report_purchases (token);
create index if not exists report_purchases_session_idx  on public.report_purchases (stripe_session_id);

-- ── 3. RLS ───────────────────────────────────────────────────
-- Scans: no public read (API route uses service role key)
alter table public.scans enable row level security;
create policy "service role only" on public.scans
  using (auth.role() = 'service_role');

-- Purchases: no public read (API route uses service role key)
alter table public.report_purchases enable row level security;
create policy "service role only" on public.report_purchases
  using (auth.role() = 'service_role');

-- ── 4. Helper function: clean up old unpaid sessions ─────────
-- Run as a scheduled job (pg_cron) or manually.
-- Deletes scans older than 7 days that were never purchased.
create or replace function public.cleanup_unpurchased_scans()
returns void language sql security definer as $$
  delete from public.scans
  where created_at < now() - interval '7 days'
    and id not in (
      select scan_id from public.report_purchases where paid_at is not null
    );
$$;
