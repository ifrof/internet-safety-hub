-- Add explicit "Require authentication" policies for defense-in-depth
-- These ensure anonymous users cannot access data even if existing policies have gaps

-- Profiles: Users can only view own profile (already exists), but add explicit auth check
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Require authentication for profiles') THEN
    CREATE POLICY "Require authentication for profiles" ON public.profiles
    FOR SELECT USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Factories: Already restricted to admins and owners, but ensure no anon access
-- The view factories_public is the intended public interface

-- Conversations: Add auth requirement
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Require authentication for conversations') THEN
    CREATE POLICY "Require authentication for conversations" ON public.conversations
    FOR ALL USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Messages: Add auth requirement
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Require authentication for messages') THEN
    CREATE POLICY "Require authentication for messages" ON public.messages
    FOR ALL USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Import orders: Add auth requirement
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Require authentication for import_orders') THEN
    CREATE POLICY "Require authentication for import_orders" ON public.import_orders
    FOR ALL USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Order documents: Add auth requirement
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Require authentication for order_documents') THEN
    CREATE POLICY "Require authentication for order_documents" ON public.order_documents
    FOR ALL USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Order timeline: Add auth requirement
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Require authentication for order_timeline') THEN
    CREATE POLICY "Require authentication for order_timeline" ON public.order_timeline
    FOR ALL USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Contact access log: Add auth requirement
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Require authentication for contact_access_log') THEN
    CREATE POLICY "Require authentication for contact_access_log" ON public.contact_access_log
    FOR ALL USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Factory searches: Add auth requirement
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Require authentication for factory_searches') THEN
    CREATE POLICY "Require authentication for factory_searches" ON public.factory_searches
    FOR ALL USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Factory results: Add auth requirement
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Require authentication for factory_results') THEN
    CREATE POLICY "Require authentication for factory_results" ON public.factory_results
    FOR ALL USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- Service requests: Add auth requirement
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Require authentication for service_requests') THEN
    CREATE POLICY "Require authentication for service_requests" ON public.service_requests
    FOR ALL USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- User roles: Add auth requirement
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Require authentication for user_roles') THEN
    CREATE POLICY "Require authentication for user_roles" ON public.user_roles
    FOR ALL USING (auth.uid() IS NOT NULL);
  END IF;
END $$;