-- Add phone capture to newsletter_subscribers (Shipped. CLI/Telegram intake).
-- 2026-06-15
--
-- Phone is collected via the CLI/Telegram intakes and stored for a future
-- SMS dispatch path. The daily launcher stays email-only for now, so phone
-- is nullable and unused by the current send path.

alter table public.newsletter_subscribers
  add column if not exists phone text;

comment on column public.newsletter_subscribers.phone is
  'E.164 phone number, optional. Captured via CLI/Telegram Shipped. intake. Stored for a future SMS dispatch path; the daily launcher is email-only today.';
