-- Shipped. email list integration
-- 2026-04-23
--
-- Extends the existing newsletter_subscribers infrastructure so Shipped.
-- can use the same table but send independently from the general id8Labs
-- newsletter.
--
-- Design:
--   - `lists` text[] column on newsletter_subscribers tracks which lists
--     each subscriber is on. Default ['newsletter']. Shipped subscribers
--     get ['newsletter', 'shipped'] (automatic main-list opt-in is our
--     editorial call; swap to ['shipped'] only if we want strict opt-in
--     per list — current stance is Shipped gets both by default because
--     the Shipped reader is the target newsletter reader).
--
--   - `shipped_issue_sends` view over newsletter_sends filters to
--     Shipped issue numbers (we store these with a specific issue_number
--     namespace: Shipped Issue 02 is issue_number = 1002, general
--     newsletter Issue 2 is issue_number = 2. See issue_number_to_label()).
--
-- After this migration lands, an existing subscriber's default lists
-- will be ['newsletter']; Shipped-source signups will get both.

-- 1. Lists column
alter table public.newsletter_subscribers
  add column if not exists lists text[] default array['newsletter']::text[];

-- Backfill existing rows so nobody has a NULL lists value.
update public.newsletter_subscribers
  set lists = array['newsletter']::text[]
  where lists is null;

-- GIN index for `lists @> array['shipped']` list-membership lookups.
create index if not exists newsletter_subscribers_lists_gin
  on public.newsletter_subscribers using gin (lists);

-- 2. Issue-number namespace helpers (Shipped issues stored as 1000 + issue_num).
--    Keeps us on one sends table while distinguishing Shipped from general
--    newsletter in a single query.
create or replace function shipped_issue_number(issue_num int)
returns int
language sql
immutable
as $$
  select 1000 + issue_num;
$$;

-- 3. Convenience view: all Shipped sends.
create or replace view public.shipped_sends as
  select
    id,
    email,
    issue_number - 1000 as shipped_issue_number,
    is_academy_version,
    resend_message_id,
    status,
    sent_at,
    opened_at,
    clicked_at
  from public.newsletter_sends
  where issue_number between 1001 and 1999;

comment on column public.newsletter_subscribers.lists is
  'Array of list identifiers the subscriber is opted into. Common values: ''newsletter'' (general id8Labs), ''shipped'' (weekly magazine). GIN-indexed.';

comment on function shipped_issue_number(int) is
  'Namespaces Shipped. issue numbers in newsletter_sends by adding 1000. Shipped Issue 02 → issue_number 1002. Keeps send analytics on one table without collisions.';

comment on view public.shipped_sends is
  'Filtered view of newsletter_sends showing only Shipped. issue sends, with the issue number de-namespaced.';
