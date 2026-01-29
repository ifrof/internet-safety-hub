-- Add rate limiting columns to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_search_count INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_search_reset_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '24 hours');

-- Add daily message count for rate limiting
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_message_count INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_message_reset_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '24 hours');

-- Add contact access tracking for premium users
CREATE TABLE IF NOT EXISTS public.contact_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  factory_id UUID NOT NULL,
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, factory_id)
);

-- Enable RLS on contact_access_log
ALTER TABLE public.contact_access_log ENABLE ROW LEVEL SECURITY;

-- Users can view their own access log
CREATE POLICY "Users can view own contact access" ON public.contact_access_log
FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own access log
CREATE POLICY "Users can log contact access" ON public.contact_access_log
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create cleanup function for expired searches
CREATE OR REPLACE FUNCTION public.cleanup_expired_searches()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  WITH deleted AS (
    DELETE FROM factory_searches 
    WHERE expires_at < now() - interval '1 day'
    RETURNING id
  )
  SELECT COUNT(*) INTO deleted_count FROM deleted;
  
  RETURN deleted_count;
END;
$$;

-- Create function to reset daily quotas
CREATE OR REPLACE FUNCTION public.reset_daily_quotas()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles 
  SET 
    daily_search_count = 0,
    daily_search_reset_at = now() + interval '24 hours',
    daily_message_count = 0,
    daily_message_reset_at = now() + interval '24 hours'
  WHERE daily_search_reset_at < now() OR daily_message_reset_at < now();
END;
$$;

-- Create function to check and update search rate limit (called from edge function)
CREATE OR REPLACE FUNCTION public.check_search_rate_limit(p_user_id UUID)
RETURNS TABLE(allowed BOOLEAN, remaining INTEGER, reset_at TIMESTAMP WITH TIME ZONE)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile profiles%ROWTYPE;
  v_limit INTEGER;
BEGIN
  -- Get or create profile
  SELECT * INTO v_profile FROM profiles WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false::BOOLEAN, 0::INTEGER, now()::TIMESTAMP WITH TIME ZONE;
    RETURN;
  END IF;
  
  -- Reset if expired
  IF v_profile.daily_search_reset_at < now() THEN
    UPDATE profiles SET 
      daily_search_count = 0,
      daily_search_reset_at = now() + interval '24 hours'
    WHERE user_id = p_user_id
    RETURNING * INTO v_profile;
  END IF;
  
  -- Determine limit based on subscription
  v_limit := CASE 
    WHEN v_profile.subscription_plan = 'premium' THEN 100
    WHEN v_profile.subscription_plan = 'basic' THEN 20
    ELSE 5 -- free
  END;
  
  -- Check if under limit
  IF v_profile.daily_search_count >= v_limit THEN
    RETURN QUERY SELECT false::BOOLEAN, 0::INTEGER, v_profile.daily_search_reset_at;
    RETURN;
  END IF;
  
  -- Increment counter
  UPDATE profiles SET daily_search_count = daily_search_count + 1 WHERE user_id = p_user_id;
  
  RETURN QUERY SELECT true::BOOLEAN, (v_limit - v_profile.daily_search_count - 1)::INTEGER, v_profile.daily_search_reset_at;
END;
$$;

-- Create function to check message rate limit
CREATE OR REPLACE FUNCTION public.check_message_rate_limit(p_user_id UUID)
RETURNS TABLE(allowed BOOLEAN, remaining INTEGER, reset_at TIMESTAMP WITH TIME ZONE)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile profiles%ROWTYPE;
  v_limit INTEGER := 100; -- 100 messages per day
BEGIN
  SELECT * INTO v_profile FROM profiles WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false::BOOLEAN, 0::INTEGER, now()::TIMESTAMP WITH TIME ZONE;
    RETURN;
  END IF;
  
  -- Reset if expired
  IF v_profile.daily_message_reset_at < now() THEN
    UPDATE profiles SET 
      daily_message_count = 0,
      daily_message_reset_at = now() + interval '24 hours'
    WHERE user_id = p_user_id
    RETURNING * INTO v_profile;
  END IF;
  
  IF v_profile.daily_message_count >= v_limit THEN
    RETURN QUERY SELECT false::BOOLEAN, 0::INTEGER, v_profile.daily_message_reset_at;
    RETURN;
  END IF;
  
  UPDATE profiles SET daily_message_count = daily_message_count + 1 WHERE user_id = p_user_id;
  
  RETURN QUERY SELECT true::BOOLEAN, (v_limit - v_profile.daily_message_count - 1)::INTEGER, v_profile.daily_message_reset_at;
END;
$$;

-- Remove anonymous search insert policy (edge function requires auth anyway)
DROP POLICY IF EXISTS "Anonymous can create searches" ON public.factory_searches;

-- Add input validation constraint on messages
ALTER TABLE public.messages ADD CONSTRAINT check_content_length 
  CHECK (length(content) > 0 AND length(content) <= 10000);

-- Add daily contact access limit for premium users
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_contact_access_count INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS daily_contact_reset_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '24 hours');

-- Create function to check contact access rate limit
CREATE OR REPLACE FUNCTION public.check_contact_rate_limit(p_user_id UUID)
RETURNS TABLE(allowed BOOLEAN, remaining INTEGER, reset_at TIMESTAMP WITH TIME ZONE)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile profiles%ROWTYPE;
  v_limit INTEGER;
BEGIN
  SELECT * INTO v_profile FROM profiles WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false::BOOLEAN, 0::INTEGER, now()::TIMESTAMP WITH TIME ZONE;
    RETURN;
  END IF;
  
  -- Reset if expired
  IF v_profile.daily_contact_reset_at < now() THEN
    UPDATE profiles SET 
      daily_contact_access_count = 0,
      daily_contact_reset_at = now() + interval '24 hours'
    WHERE user_id = p_user_id
    RETURNING * INTO v_profile;
  END IF;
  
  -- Limit based on subscription
  v_limit := CASE 
    WHEN v_profile.subscription_plan = 'premium' THEN 50
    WHEN v_profile.subscription_plan = 'basic' THEN 10
    ELSE 0
  END;
  
  IF v_profile.daily_contact_access_count >= v_limit THEN
    RETURN QUERY SELECT false::BOOLEAN, 0::INTEGER, v_profile.daily_contact_reset_at;
    RETURN;
  END IF;
  
  UPDATE profiles SET daily_contact_access_count = daily_contact_access_count + 1 WHERE user_id = p_user_id;
  
  RETURN QUERY SELECT true::BOOLEAN, (v_limit - v_profile.daily_contact_access_count - 1)::INTEGER, v_profile.daily_contact_reset_at;
END;
$$;