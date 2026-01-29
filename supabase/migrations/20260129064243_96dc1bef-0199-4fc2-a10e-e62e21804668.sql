-- =============================================
-- IFROF Platform Database Schema Update
-- =============================================

-- 1. Create user_type enum
DO $$ BEGIN
  CREATE TYPE public.user_type AS ENUM ('buyer', 'factory', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Create verification_status enum
DO $$ BEGIN
  CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Create order_status enum
DO $$ BEGIN
  CREATE TYPE public.order_status AS ENUM ('draft', 'inquiry', 'confirmed', 'shipped', 'delivered', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 4. Create document_type enum
DO $$ BEGIN
  CREATE TYPE public.document_type AS ENUM ('invoice', 'packing_list', 'certificate', 'inspection', 'other');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 5. Create service_type enum
DO $$ BEGIN
  CREATE TYPE public.service_type AS ENUM ('inspection', 'shipping', 'customs', 'other');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 6. Create inspection_status enum
DO $$ BEGIN
  CREATE TYPE public.inspection_status AS ENUM ('none', 'pending', 'completed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- =============================================
-- UPDATE PROFILES TABLE
-- =============================================
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS user_type user_type DEFAULT 'buyer',
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS verification_status verification_status DEFAULT 'pending';

-- =============================================
-- UPDATE FACTORIES TABLE
-- =============================================
ALTER TABLE public.factories
  ADD COLUMN IF NOT EXISTS owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS verification_documents JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS founded_year INTEGER,
  ADD COLUMN IF NOT EXISTS inspection_status inspection_status DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS last_activity TIMESTAMP WITH TIME ZONE DEFAULT now();

-- =============================================
-- UPDATE PRODUCTS TABLE
-- =============================================
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS hs_code TEXT,
  ADD COLUMN IF NOT EXISTS max_order_quantity INTEGER,
  ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS shipping_available BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;

-- =============================================
-- UPDATE IMPORT_ORDERS TABLE  
-- =============================================
ALTER TABLE public.import_orders
  ADD COLUMN IF NOT EXISTS delivery_address TEXT,
  ADD COLUMN IF NOT EXISTS special_requirements TEXT;

-- =============================================
-- UPDATE ORDER_DOCUMENTS TABLE
-- =============================================
-- Already exists with similar structure

-- =============================================
-- UPDATE FACTORY_SEARCHES TABLE
-- =============================================
ALTER TABLE public.factory_searches
  ADD COLUMN IF NOT EXISTS results_count INTEGER DEFAULT 0;

-- =============================================
-- UPDATE FACTORY_RESULTS TABLE
-- =============================================
ALTER TABLE public.factory_results
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS is_verified_factory BOOLEAN DEFAULT false;

-- =============================================
-- UPDATE MESSAGES TABLE
-- =============================================
ALTER TABLE public.messages
  ADD COLUMN IF NOT EXISTS receiver_id UUID,
  ADD COLUMN IF NOT EXISTS order_id UUID REFERENCES public.import_orders(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT false;

-- =============================================
-- UPDATE CONVERSATIONS TABLE
-- =============================================
ALTER TABLE public.conversations
  ADD COLUMN IF NOT EXISTS participant_1_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS participant_2_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- =============================================
-- UPDATE SERVICE_REQUESTS TABLE
-- =============================================
ALTER TABLE public.service_requests
  ADD COLUMN IF NOT EXISTS order_id UUID REFERENCES public.import_orders(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS cost NUMERIC,
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';

-- =============================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- =============================================
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON public.profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_is_verified ON public.profiles(is_verified);
CREATE INDEX IF NOT EXISTS idx_factories_owner ON public.factories(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_factories_verification ON public.factories(verification_status);
CREATE INDEX IF NOT EXISTS idx_products_hs_code ON public.products(hs_code);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_import_orders_status ON public.import_orders(status);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON public.messages(is_read);

-- =============================================
-- UPDATE RLS POLICIES FOR FACTORY RESULTS
-- =============================================
-- Drop overly permissive INSERT policy
DROP POLICY IF EXISTS "System can insert results" ON public.factory_results;

-- Create a more secure policy (system/service role can insert)
CREATE POLICY "Service role can insert results"
  ON public.factory_results
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow authenticated users to insert their own search results
CREATE POLICY "Users can insert own search results"
  ON public.factory_results
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.factory_searches
      WHERE factory_searches.id = factory_results.search_id
      AND (factory_searches.user_id = auth.uid() OR factory_searches.user_id IS NULL)
    )
  );

-- =============================================
-- UPDATE RLS POLICIES FOR FACTORY SEARCHES
-- =============================================
-- Drop overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can create searches" ON public.factory_searches;

-- Create more secure policy
CREATE POLICY "Authenticated users can create searches"
  ON public.factory_searches
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Allow anonymous searches for demo purposes
CREATE POLICY "Anonymous can create searches"
  ON public.factory_searches
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);