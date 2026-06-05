-- AI-generated lessons cache table
CREATE TABLE ai_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_hash TEXT NOT NULL, -- Hash of the prompt to detect duplicates
  user_prompt TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1')),
  lesson_data JSONB NOT NULL, -- The generated lesson JSON
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, prompt_hash) -- Prevent duplicate generations
);

-- Index for fast lookups
CREATE INDEX idx_ai_lessons_user ON ai_lessons(user_id);
CREATE INDEX idx_ai_lessons_prompt ON ai_lessons(prompt_hash);
CREATE INDEX idx_ai_lessons_created ON ai_lessons(created_at DESC);

-- Row Level Security
ALTER TABLE ai_lessons ENABLE ROW LEVEL SECURITY;

-- Users can only view their own generated lessons
CREATE POLICY "Users view own AI lessons"
  ON ai_lessons FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own AI lessons
CREATE POLICY "Users insert own AI lessons"
  ON ai_lessons FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Track usage for free vs premium limits
CREATE TABLE ai_lesson_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  lessons_generated INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, week_start)
);

CREATE INDEX idx_ai_usage_user_week ON ai_lesson_usage(user_id, week_start);

ALTER TABLE ai_lesson_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own usage"
  ON ai_lesson_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own usage"
  ON ai_lesson_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own usage"
  ON ai_lesson_usage FOR UPDATE
  USING (auth.uid() = user_id);