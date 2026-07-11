-- Shipped. self-serve subscribe: capture name + cadence preferences.
-- 2026-07-11
--
-- The Shipped. issue-page form now collects an optional name and which
-- cadences the reader wants (nightly / weekly / monthly). Both are
-- nullable; the subscribe route tolerates the columns being absent, so
-- this migration can land before or after the code deploys.
--
-- `cadences` is a text[] like `lists` — NULL means "no preference
-- recorded", which senders should treat as the default (nightly+weekly,
-- matching the form's pre-checked boxes).

alter table public.newsletter_subscribers
  add column if not exists name text;

alter table public.newsletter_subscribers
  add column if not exists cadences text[];

comment on column public.newsletter_subscribers.name is
  'Optional display name, captured by the Shipped. subscribe form.';

comment on column public.newsletter_subscribers.cadences is
  'Shipped. cadences the subscriber opted into: nightly, weekly, monthly. NULL = no preference recorded (treat as nightly+weekly, the form default).';
