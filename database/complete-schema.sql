-- =====================================================
-- IFROF Platform - Complete Database Schema
-- For External Supabase Project: zgrdqjtckbuvgxrustqi
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.user_type AS ENUM ('buyer', 'factory', 'admin');
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE public.inspection_status AS ENUM ('none', 'pending', 'completed');
CREATE TYPE public.order_status AS ENUM ('draft', 'inquiry', 'confirmed', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.document_type AS ENUM ('invoice', 'packing_list', 'certificate', 'inspection', 'other');
CREATE TYPE public.service_type AS ENUM ('inspection', 'shipping', 'customs', 'other');

-- =====================================================
-- TABLES
-- =====================================================

-- 1. Profiles Table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'SA',
  user_type user_type DEFAULT 'buyer',
  preferred_language TEXT DEFAULT 'ar',
  is_verified BOOLEAN DEFAULT false,
  verification_status verification_status DEFAULT 'pending',
  subscription_plan TEXT DEFAULT 'free',
  subscription_status TEXT DEFAULT 'trial',
  subscription_end_date TIMESTAMPTZ,
  daily_search_count INTEGER DEFAULT 0,
  daily_search_reset_at TIMESTAMPTZ DEFAULT (now() + interval '24 hours'),
  daily_message_count INTEGER DEFAULT 0,
  daily_message_reset_at TIMESTAMPTZ DEFAULT (now() + interval '24 hours'),
  daily_contact_access_count INTEGER DEFAULT 0,
  daily_contact_reset_at TIMESTAMPTZ DEFAULT (now() + interval '24 hours'),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. User Roles Table (for RBAC)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

-- 3. Factories Table
CREATE TABLE public.factories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  description TEXT,
  description_en TEXT,
  description_zh TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  country TEXT DEFAULT 'CN',
  city TEXT,
  location TEXT,
  established_year INTEGER,
  founded_year INTEGER,
  employees_count TEXT,
  production_capacity TEXT,
  certifications TEXT[] DEFAULT '{}',
  main_products TEXT[] DEFAULT '{}',
  export_countries TEXT[] DEFAULT '{}',
  min_order_value NUMERIC DEFAULT 0,
  verification_status TEXT DEFAULT 'pending',
  verification_score INTEGER DEFAULT 0,
  verification_documents JSONB DEFAULT '[]',
  is_direct_factory BOOLEAN DEFAULT true,
  inspection_status inspection_status DEFAULT 'none',
  rating NUMERIC DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  response_rate INTEGER DEFAULT 0,
  response_time TEXT,
  website_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  last_activity TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Products Table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  factory_id UUID NOT NULL REFERENCES public.factories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  subcategory TEXT,
  price NUMERIC,
  min_price NUMERIC,
  max_price NUMERIC,
  currency TEXT DEFAULT 'USD',
  unit TEXT DEFAULT 'piece',
  min_order_quantity INTEGER DEFAULT 1,
  max_order_quantity INTEGER,
  lead_time TEXT,
  specifications JSONB DEFAULT '{}',
  hs_code TEXT,
  customizable BOOLEAN DEFAULT false,
  sample_available BOOLEAN DEFAULT false,
  sample_price NUMERIC,
  shipping_available BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 5. Import Orders Table
CREATE TABLE public.import_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  factory_id UUID REFERENCES public.factories(id) ON DELETE SET NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_description TEXT,
  quantity INTEGER DEFAULT 1 NOT NULL,
  estimated_price NUMERIC,
  final_price NUMERIC,
  shipping_cost NUMERIC,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending',
  shipping_method TEXT,
  delivery_address TEXT,
  special_requirements TEXT,
  notes TEXT,
  inspection_required BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 6. Conversations Table
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  factory_id UUID REFERENCES public.factories(id) ON DELETE CASCADE,
  participant_1_id UUID,
  participant_2_id UUID,
  type TEXT NOT NULL,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 7. Messages Table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  receiver_id UUID,
  sender_type TEXT NOT NULL,
  content TEXT NOT NULL,
  attachments TEXT[] DEFAULT '{}',
  order_id UUID REFERENCES public.import_orders(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 8. Service Requests Table
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.import_orders(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  details JSONB DEFAULT '{}',
  cost NUMERIC,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 9. Order Documents Table
CREATE TABLE public.order_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.import_orders(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  uploaded_by TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 10. Order Timeline Table
CREATE TABLE public.order_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.import_orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 11. Factory Searches Table
CREATE TABLE public.factory_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  search_type TEXT NOT NULL,
  input_value TEXT NOT NULL,
  input_image_url TEXT,
  normalized_product JSONB,
  optional_params JSONB DEFAULT '{}',
  status TEXT DEFAULT 'pending' NOT NULL,
  results_count INTEGER DEFAULT 0,
  error_message TEXT,
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '24 hours'),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 12. Factory Results Table
CREATE TABLE public.factory_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id UUID NOT NULL REFERENCES public.factory_searches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_zh TEXT,
  location TEXT,
  website TEXT,
  email TEXT,
  links TEXT[] DEFAULT '{}',
  score INTEGER DEFAULT 0 NOT NULL,
  is_verified_factory BOOLEAN DEFAULT false,
  is_excluded BOOLEAN DEFAULT false,
  exclusion_reason TEXT,
  why_factory TEXT[] DEFAULT '{}',
  red_flags TEXT[] DEFAULT '{}',
  verification_steps TEXT[] DEFAULT '{}',
  evidence JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 13. Contact Access Log Table
CREATE TABLE public.contact_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  factory_id UUID NOT NULL REFERENCES public.factories(id) ON DELETE CASCADE,
  accessed_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- VIEWS
-- =====================================================

-- Public Factory View (hides sensitive contact info)
CREATE OR REPLACE VIEW public.factories_public AS
SELECT 
  id,
  name,
  name_en,
  name_zh,
  description,
  description_en,
  description_zh,
  logo_url,
  cover_image_url,
  category,
  subcategory,
  country,
  city,
  location,
  established_year,
  employees_count,
  production_capacity,
  certifications,
  main_products,
  export_countries,
  min_order_value,
  verification_status,
  verification_score,
  is_direct_factory,
  rating,
  reviews_count,
  response_rate,
  response_time,
  website_url,
  created_at,
  updated_at
FROM public.factories
WHERE verification_status = 'verified';

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id, 
    full_name, 
    email,
    company_name,
    user_type
  )
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'company_name',
    COALESCE((NEW.raw_user_meta_data->>'user_type')::user_type, 'buyer'::user_type)
  );
  RETURN NEW;
END;
$$;

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Function to check search rate limit
CREATE OR REPLACE FUNCTION public.check_search_rate_limit(p_user_id UUID)
RETURNS TABLE(allowed BOOLEAN, remaining INTEGER, reset_at TIMESTAMPTZ)
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
    RETURN QUERY SELECT false::BOOLEAN, 0::INTEGER, now()::TIMESTAMPTZ;
    RETURN;
  END IF;
  
  IF v_profile.daily_search_reset_at < now() THEN
    UPDATE profiles SET 
      daily_search_count = 0,
      daily_search_reset_at = now() + interval '24 hours'
    WHERE user_id = p_user_id
    RETURNING * INTO v_profile;
  END IF;
  
  v_limit := CASE 
    WHEN v_profile.subscription_plan = 'premium' THEN 100
    WHEN v_profile.subscription_plan = 'basic' THEN 20
    ELSE 5
  END;
  
  IF v_profile.daily_search_count >= v_limit THEN
    RETURN QUERY SELECT false::BOOLEAN, 0::INTEGER, v_profile.daily_search_reset_at;
    RETURN;
  END IF;
  
  UPDATE profiles SET daily_search_count = daily_search_count + 1 WHERE user_id = p_user_id;
  
  RETURN QUERY SELECT true::BOOLEAN, (v_limit - v_profile.daily_search_count - 1)::INTEGER, v_profile.daily_search_reset_at;
END;
$$;

-- Function to check message rate limit
CREATE OR REPLACE FUNCTION public.check_message_rate_limit(p_user_id UUID)
RETURNS TABLE(allowed BOOLEAN, remaining INTEGER, reset_at TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile profiles%ROWTYPE;
  v_limit INTEGER := 100;
BEGIN
  SELECT * INTO v_profile FROM profiles WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false::BOOLEAN, 0::INTEGER, now()::TIMESTAMPTZ;
    RETURN;
  END IF;
  
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

-- Function to check contact rate limit
CREATE OR REPLACE FUNCTION public.check_contact_rate_limit(p_user_id UUID)
RETURNS TABLE(allowed BOOLEAN, remaining INTEGER, reset_at TIMESTAMPTZ)
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
    RETURN QUERY SELECT false::BOOLEAN, 0::INTEGER, now()::TIMESTAMPTZ;
    RETURN;
  END IF;
  
  IF v_profile.daily_contact_reset_at < now() THEN
    UPDATE profiles SET 
      daily_contact_access_count = 0,
      daily_contact_reset_at = now() + interval '24 hours'
    WHERE user_id = p_user_id
    RETURNING * INTO v_profile;
  END IF;
  
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

-- Function to reset daily quotas
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

-- Function to cleanup expired searches
CREATE OR REPLACE FUNCTION public.cleanup_expired_searches()
RETURNS INTEGER
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

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_factories_updated_at
  BEFORE UPDATE ON public.factories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_import_orders_updated_at
  BEFORE UPDATE ON public.import_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_requests_updated_at
  BEFORE UPDATE ON public.service_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_factory_searches_updated_at
  BEFORE UPDATE ON public.factory_searches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factory_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factory_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_access_log ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Deny anonymous access to profiles" ON public.profiles FOR SELECT USING (auth.uid() IS NOT NULL);

-- USER ROLES POLICIES
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Require authentication for user_roles" ON public.user_roles FOR ALL USING (auth.uid() IS NOT NULL);

-- FACTORIES POLICIES
CREATE POLICY "Authenticated users can view verified factories" ON public.factories FOR SELECT USING ((auth.uid() IS NOT NULL) AND (verification_status = 'verified'));
CREATE POLICY "Factory owners can view own factory" ON public.factories FOR SELECT USING (owner_user_id = auth.uid());
CREATE POLICY "Admins can view all factories" ON public.factories FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage all factories" ON public.factories FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Require auth for factories" ON public.factories FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Anyone can view factories_public" ON public.factories FOR SELECT USING (verification_status = 'verified');

-- PRODUCTS POLICIES
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Factory owners can view own products" ON public.products FOR SELECT USING (EXISTS (SELECT 1 FROM factories WHERE factories.id = products.factory_id AND factories.owner_user_id = auth.uid()));
CREATE POLICY "Factory owners can insert products" ON public.products FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM factories WHERE factories.id = products.factory_id AND factories.owner_user_id = auth.uid()));
CREATE POLICY "Factory owners can update products" ON public.products FOR UPDATE USING (EXISTS (SELECT 1 FROM factories WHERE factories.id = products.factory_id AND factories.owner_user_id = auth.uid()));
CREATE POLICY "Factory owners can delete products" ON public.products FOR DELETE USING (EXISTS (SELECT 1 FROM factories WHERE factories.id = products.factory_id AND factories.owner_user_id = auth.uid()));
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (has_role(auth.uid(), 'admin'));

-- IMPORT ORDERS POLICIES
CREATE POLICY "Users can view own orders" ON public.import_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.import_orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own orders" ON public.import_orders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Factory owners can view orders" ON public.import_orders FOR SELECT USING (EXISTS (SELECT 1 FROM factories WHERE factories.id = import_orders.factory_id AND factories.owner_user_id = auth.uid()));
CREATE POLICY "Factory owners can update orders" ON public.import_orders FOR UPDATE USING (EXISTS (SELECT 1 FROM factories WHERE factories.id = import_orders.factory_id AND factories.owner_user_id = auth.uid()));
CREATE POLICY "Require authentication for import_orders" ON public.import_orders FOR ALL USING (auth.uid() IS NOT NULL);

-- CONVERSATIONS POLICIES
CREATE POLICY "Users can view own conversations" ON public.conversations FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own conversations" ON public.conversations FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Factory owners can view conversations" ON public.conversations FOR SELECT USING ((factory_id IS NOT NULL) AND (EXISTS (SELECT 1 FROM factories WHERE factories.id = conversations.factory_id AND factories.owner_user_id = auth.uid())));
CREATE POLICY "Require authentication for conversations" ON public.conversations FOR ALL USING (auth.uid() IS NOT NULL);

-- MESSAGES POLICIES
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid()));
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK ((sender_id = auth.uid()) AND (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid())));
CREATE POLICY "Users can update own messages" ON public.messages FOR UPDATE USING (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid()));
CREATE POLICY "Factory owners can view messages" ON public.messages FOR SELECT USING (EXISTS (SELECT 1 FROM conversations c JOIN factories f ON f.id = c.factory_id WHERE c.id = messages.conversation_id AND f.owner_user_id = auth.uid()));
CREATE POLICY "Factory owners can send messages" ON public.messages FOR INSERT WITH CHECK ((sender_id = auth.uid()) AND (EXISTS (SELECT 1 FROM conversations c JOIN factories f ON f.id = c.factory_id WHERE c.id = messages.conversation_id AND f.owner_user_id = auth.uid())));
CREATE POLICY "Require authentication for messages" ON public.messages FOR ALL USING (auth.uid() IS NOT NULL);

-- SERVICE REQUESTS POLICIES
CREATE POLICY "Users can view own service requests" ON public.service_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create service requests" ON public.service_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own service requests" ON public.service_requests FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all service requests" ON public.service_requests FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update service requests" ON public.service_requests FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Require authentication for service_requests" ON public.service_requests FOR ALL USING (auth.uid() IS NOT NULL);

-- ORDER DOCUMENTS POLICIES
CREATE POLICY "Users can view own order documents" ON public.order_documents FOR SELECT USING (EXISTS (SELECT 1 FROM import_orders WHERE import_orders.id = order_documents.order_id AND import_orders.user_id = auth.uid()));
CREATE POLICY "Users can add documents to own orders" ON public.order_documents FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM import_orders WHERE import_orders.id = order_documents.order_id AND import_orders.user_id = auth.uid()));
CREATE POLICY "Factory owners can view order documents" ON public.order_documents FOR SELECT USING (EXISTS (SELECT 1 FROM import_orders o JOIN factories f ON f.id = o.factory_id WHERE o.id = order_documents.order_id AND f.owner_user_id = auth.uid()));
CREATE POLICY "Factory owners can add order documents" ON public.order_documents FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM import_orders o JOIN factories f ON f.id = o.factory_id WHERE o.id = order_documents.order_id AND f.owner_user_id = auth.uid()));
CREATE POLICY "Require authentication for order_documents" ON public.order_documents FOR ALL USING (auth.uid() IS NOT NULL);

-- ORDER TIMELINE POLICIES
CREATE POLICY "Users can view own order timeline" ON public.order_timeline FOR SELECT USING (EXISTS (SELECT 1 FROM import_orders WHERE import_orders.id = order_timeline.order_id AND import_orders.user_id = auth.uid()));
CREATE POLICY "Factory owners can view order timeline" ON public.order_timeline FOR SELECT USING (EXISTS (SELECT 1 FROM import_orders o JOIN factories f ON f.id = o.factory_id WHERE o.id = order_timeline.order_id AND f.owner_user_id = auth.uid()));
CREATE POLICY "Factory owners can insert order timeline" ON public.order_timeline FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM import_orders o JOIN factories f ON f.id = o.factory_id WHERE o.id = order_timeline.order_id AND f.owner_user_id = auth.uid()));
CREATE POLICY "Require authentication for order_timeline" ON public.order_timeline FOR ALL USING (auth.uid() IS NOT NULL);

-- FACTORY SEARCHES POLICIES
CREATE POLICY "Users can view own searches" ON public.factory_searches FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Authenticated users can create searches" ON public.factory_searches FOR INSERT WITH CHECK ((user_id = auth.uid()) AND (user_id IS NOT NULL));
CREATE POLICY "Users can update own searches" ON public.factory_searches FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Require authentication for factory_searches" ON public.factory_searches FOR ALL USING (auth.uid() IS NOT NULL);

-- FACTORY RESULTS POLICIES
CREATE POLICY "Users can view own search results" ON public.factory_results FOR SELECT USING (EXISTS (SELECT 1 FROM factory_searches WHERE factory_searches.id = factory_results.search_id AND factory_searches.user_id = auth.uid()));
CREATE POLICY "Users can insert own search results" ON public.factory_results FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM factory_searches WHERE factory_searches.id = factory_results.search_id AND ((factory_searches.user_id = auth.uid()) OR (factory_searches.user_id IS NULL))));
CREATE POLICY "Service role can insert results" ON public.factory_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Require authentication for factory_results" ON public.factory_results FOR ALL USING (auth.uid() IS NOT NULL);

-- CONTACT ACCESS LOG POLICIES
CREATE POLICY "Users can view own contact access" ON public.contact_access_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can log contact access" ON public.contact_access_log FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Require authentication for contact_access_log" ON public.contact_access_log FOR ALL USING (auth.uid() IS NOT NULL);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_factories_category ON public.factories(category);
CREATE INDEX idx_factories_verification_status ON public.factories(verification_status);
CREATE INDEX idx_factories_country ON public.factories(country);
CREATE INDEX idx_products_factory_id ON public.products(factory_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_import_orders_user_id ON public.import_orders(user_id);
CREATE INDEX idx_import_orders_factory_id ON public.import_orders(factory_id);
CREATE INDEX idx_import_orders_status ON public.import_orders(status);
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_service_requests_user_id ON public.service_requests(user_id);
CREATE INDEX idx_factory_searches_user_id ON public.factory_searches(user_id);
CREATE INDEX idx_factory_results_search_id ON public.factory_results(search_id);

-- =====================================================
-- END OF SCHEMA
-- =====================================================
