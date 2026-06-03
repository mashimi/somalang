-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT UNIQUE NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES auth.users(id),
  premium_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_id TEXT UNIQUE NOT NULL,
  amount INT NOT NULL,
  sender_name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  premium_days INT DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referee_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_xp INT DEFAULT 500,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'granted')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes (ignore if already exist from partial apply)
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON user_profiles(referral_code);

-- Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Policies (drop existing first in case of partial apply)
DROP POLICY IF EXISTS "Users view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Public read referral codes" ON user_profiles;
DROP POLICY IF EXISTS "Users view own payments" ON payments;
DROP POLICY IF EXISTS "Users insert own payments" ON payments;
DROP POLICY IF EXISTS "Users view own referrals" ON referrals;
DROP POLICY IF EXISTS "Users insert own referrals" ON referrals;

CREATE POLICY "Users view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own payments"
  ON payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own referrals"
  ON referrals FOR SELECT
  USING (auth.uid() = referrer_id OR auth.uid() = referee_id);

CREATE POLICY "Users insert own referrals"
  ON referrals FOR INSERT
  WITH CHECK (auth.uid() = referee_id);

-- Allow public read of referral codes (for validation during signup)
-- SELECT policies only use USING, not WITH CHECK
CREATE POLICY "Public read referral codes"
  ON user_profiles FOR SELECT
  USING (true);