-- ═══════════════════════════════════════════════════════════
-- Fix overly permissive RLS policies
--
-- The original migration created a "Public read referral codes" policy
-- with `USING (true)`. Combined with the user-specific SELECT policy,
-- PostgreSQL ORs SELECT policies together — so ANY user (or anonymous
-- request) can read EVERY column of EVERY profile in user_profiles,
-- including phone numbers and premium_until dates.
--
-- This migration:
--   1. Drops the overly broad public-read policy.
--   2. Replaces it with a SECURITY DEFINER function that exposes only
--      the referrer's id, so the signup flow can validate a referral
--      code without revealing any private profile data.
--   3. Restricts the public SELECT policy to a row-level check that
--      matches the original intent (lookup by referral_code only).
-- ═══════════════════════════════════════════════════════════

-- Drop the bad policy.
DROP POLICY IF EXISTS "Public read referral codes" ON user_profiles;

-- Helper RPC used by the signup screen to look up a referrer's id by code.
-- Runs with the function owner's privileges, bypassing RLS so it can read
-- the row, but only returns the columns we explicitly select below.
CREATE OR REPLACE FUNCTION public.get_referrer_id_by_code(code TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  referrer_id UUID;
BEGIN
  SELECT id INTO referrer_id
  FROM user_profiles
  WHERE referral_code = upper(code)
  LIMIT 1;

  RETURN referrer_id;
END;
$$;

REVOKE ALL ON FUNCTION public.get_referrer_id_by_code(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_referrer_id_by_code(TEXT) TO anon, authenticated;

-- Now the user_profiles SELECT policy is just the user-specific one
-- (no anonymous access to the table itself).
DROP POLICY IF EXISTS "Users view own profile" ON user_profiles;
CREATE POLICY "Users view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Restrict payments and referrals further so the only "view" path is
-- "I am the user on the row". The original migration already did this
-- but we re-declare to make the intent explicit and idempotent.
DROP POLICY IF EXISTS "Users view own payments" ON payments;
CREATE POLICY "Users view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own referrals" ON referrals;
CREATE POLICY "Users view own referrals"
  ON referrals FOR SELECT
  USING (auth.uid() = referrer_id OR auth.uid() = referee_id);
