-- Add explicit authentication requirement policies as first-line defense
-- These are RESTRICTIVE policies that work with existing ones

-- Profiles: Already has "Users can view own profile" but add base auth check
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Deny anonymous access to profiles') THEN
    CREATE POLICY "Deny anonymous access to profiles" ON public.profiles
    FOR SELECT USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Factories: Add base auth requirement (anon already revoked SELECT via REVOKE, but policy ensures it)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'factories' AND policyname = 'Require auth for factories') THEN
    CREATE POLICY "Require auth for factories" ON public.factories
    FOR SELECT USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Order timeline: Allow factory owners to view and insert
DROP POLICY IF EXISTS "Factory owners can view order timeline" ON public.order_timeline;
CREATE POLICY "Factory owners can view order timeline" ON public.order_timeline
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM import_orders o
    JOIN factories f ON f.id = o.factory_id
    WHERE o.id = order_timeline.order_id 
    AND f.owner_user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Factory owners can insert order timeline" ON public.order_timeline;
CREATE POLICY "Factory owners can insert order timeline" ON public.order_timeline
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM import_orders o
    JOIN factories f ON f.id = o.factory_id
    WHERE o.id = order_timeline.order_id 
    AND f.owner_user_id = auth.uid()
  )
);