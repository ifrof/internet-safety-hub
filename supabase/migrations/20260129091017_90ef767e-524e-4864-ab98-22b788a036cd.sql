-- Fix 1: Ensure profiles table is properly restricted to own user only
-- The policy already exists, but we need to verify it's working correctly
-- Drop any overly permissive policies that might exist
DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Fix 2: Ensure factories table has no public access - only via factories_public view
-- Remove any policies that might allow public SELECT
DROP POLICY IF EXISTS "Anyone can view factories" ON public.factories;
DROP POLICY IF EXISTS "Anyone can view verified factories" ON public.factories;
DROP POLICY IF EXISTS "Public can view verified factories" ON public.factories;

-- Ensure the factories_public view is the only way to access factory data publicly
-- Grant SELECT on the view to authenticated and anon roles
GRANT SELECT ON public.factories_public TO anon;
GRANT SELECT ON public.factories_public TO authenticated;

-- Revoke direct SELECT on factories table from anon (public)
REVOKE SELECT ON public.factories FROM anon;

-- Add explicit admin policy for factories if not exists
DROP POLICY IF EXISTS "Admins can view all factories" ON public.factories;
CREATE POLICY "Admins can view all factories" ON public.factories
FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));