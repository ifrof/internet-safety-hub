# دليل نقل المشروع إلى Supabase الخاص بك

## 1. إعداد مشروع Supabase جديد

إذا لم يكن لديك مشروع، أنشئ واحدًا على https://supabase.com

مشروعك الحالي: `https://zgrdqjtckbuvgxrustqi.supabase.co`

## 2. نقل قاعدة البيانات (Database Schema)

### الخطوة 1: تصدير الـ Schema

قم بتشغيل هذا الـ SQL في Supabase SQL Editor لمشروعك الجديد:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.user_type AS ENUM ('buyer', 'factory', 'admin');
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE public.inspection_status AS ENUM ('none', 'pending', 'completed');

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  full_name text,
  email text,
  phone text,
  company_name text,
  country text DEFAULT 'SA',
  city text,
  address text,
  avatar_url text,
  user_type user_type DEFAULT 'buyer',
  preferred_language text DEFAULT 'ar',
  subscription_plan text DEFAULT 'free',
  subscription_status text DEFAULT 'trial',
  subscription_end_date timestamptz,
  is_verified boolean DEFAULT false,
  verification_status verification_status DEFAULT 'pending',
  daily_search_count integer DEFAULT 0,
  daily_search_reset_at timestamptz DEFAULT (now() + interval '24 hours'),
  daily_message_count integer DEFAULT 0,
  daily_message_reset_at timestamptz DEFAULT (now() + interval '24 hours'),
  daily_contact_access_count integer DEFAULT 0,
  daily_contact_reset_at timestamptz DEFAULT (now() + interval '24 hours'),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

-- Create factories table
CREATE TABLE public.factories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  name_en text,
  name_zh text,
  description text,
  description_en text,
  description_zh text,
  category text NOT NULL,
  subcategory text,
  country text DEFAULT 'CN',
  city text,
  location text,
  logo_url text,
  cover_image_url text,
  website_url text,
  contact_email text,
  contact_phone text,
  main_products text[],
  certifications text[],
  export_countries text[],
  employees_count text,
  production_capacity text,
  established_year integer,
  founded_year integer,
  min_order_value numeric DEFAULT 0,
  rating numeric DEFAULT 0,
  reviews_count integer DEFAULT 0,
  response_rate integer DEFAULT 0,
  response_time text,
  verification_status text DEFAULT 'pending',
  verification_score integer DEFAULT 0,
  verification_documents jsonb DEFAULT '[]',
  is_direct_factory boolean DEFAULT true,
  inspection_status inspection_status DEFAULT 'none',
  owner_user_id uuid,
  last_activity timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create products table
CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  factory_id uuid NOT NULL REFERENCES factories(id),
  name text NOT NULL,
  name_en text,
  name_zh text,
  description text,
  category text NOT NULL,
  subcategory text,
  images text[],
  price numeric,
  min_price numeric,
  max_price numeric,
  currency text DEFAULT 'USD',
  unit text DEFAULT 'piece',
  min_order_quantity integer DEFAULT 1,
  max_order_quantity integer,
  lead_time text,
  hs_code text,
  specifications jsonb DEFAULT '{}',
  customizable boolean DEFAULT false,
  sample_available boolean DEFAULT false,
  sample_price numeric,
  shipping_available boolean DEFAULT true,
  stock_quantity integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create factory_searches table
CREATE TABLE public.factory_searches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  search_type text NOT NULL,
  input_value text NOT NULL,
  input_image_url text,
  optional_params jsonb DEFAULT '{}',
  normalized_product jsonb,
  status text DEFAULT 'pending' NOT NULL,
  error_message text,
  results_count integer DEFAULT 0,
  expires_at timestamptz DEFAULT (now() + interval '24 hours'),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create factory_results table
CREATE TABLE public.factory_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  search_id uuid NOT NULL REFERENCES factory_searches(id),
  name text NOT NULL,
  name_zh text,
  location text,
  website text,
  email text,
  links text[] DEFAULT '{}',
  score integer DEFAULT 0 NOT NULL,
  why_factory text[] DEFAULT '{}',
  red_flags text[] DEFAULT '{}',
  verification_steps text[] DEFAULT '{}',
  evidence jsonb DEFAULT '[]',
  is_verified_factory boolean DEFAULT false,
  is_excluded boolean DEFAULT false,
  exclusion_reason text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create import_orders table
CREATE TABLE public.import_orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  factory_id uuid REFERENCES factories(id),
  product_id uuid REFERENCES products(id),
  product_name text NOT NULL,
  product_description text,
  quantity integer DEFAULT 1 NOT NULL,
  estimated_price numeric,
  final_price numeric,
  currency text DEFAULT 'USD',
  shipping_method text,
  shipping_cost numeric,
  delivery_address text,
  special_requirements text,
  notes text,
  inspection_required boolean DEFAULT false,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create order_timeline table
CREATE TABLE public.order_timeline (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid NOT NULL REFERENCES import_orders(id),
  status text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create order_documents table
CREATE TABLE public.order_documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid NOT NULL REFERENCES import_orders(id),
  type text NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  uploaded_by text DEFAULT 'user',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create conversations table
CREATE TABLE public.conversations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  factory_id uuid REFERENCES factories(id),
  participant_1_id uuid,
  participant_2_id uuid,
  type text NOT NULL,
  last_message_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create messages table
CREATE TABLE public.messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id uuid NOT NULL,
  sender_id uuid NOT NULL,
  sender_type text NOT NULL,
  receiver_id uuid,
  order_id uuid REFERENCES import_orders(id),
  content text NOT NULL,
  attachments text[],
  is_read boolean DEFAULT false,
  read_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create service_requests table
CREATE TABLE public.service_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  order_id uuid REFERENCES import_orders(id),
  type text NOT NULL,
  details jsonb DEFAULT '{}',
  cost numeric,
  currency text DEFAULT 'USD',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create contact_access_log table
CREATE TABLE public.contact_access_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  factory_id uuid NOT NULL,
  accessed_at timestamptz DEFAULT now()
);

-- Create public view for factories (hides sensitive data)
CREATE VIEW public.factories_public AS
SELECT 
  id, name, name_en, name_zh, description, description_en, description_zh,
  category, subcategory, country, city, location, logo_url, cover_image_url,
  website_url, main_products, certifications, export_countries, employees_count,
  production_capacity, established_year, min_order_value, rating, reviews_count,
  response_rate, response_time, verification_status, verification_score,
  is_direct_factory, created_at, updated_at
FROM factories;
```

### الخطوة 2: إنشاء الـ Functions

```sql
-- has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
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

-- update_updated_at_column trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
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

-- Rate limit functions
CREATE OR REPLACE FUNCTION public.check_search_rate_limit(p_user_id uuid)
RETURNS TABLE(allowed boolean, remaining integer, reset_at timestamptz)
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

CREATE OR REPLACE FUNCTION public.check_message_rate_limit(p_user_id uuid)
RETURNS TABLE(allowed boolean, remaining integer, reset_at timestamptz)
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
    RETURN QUERY SELECT false::BOOLEAN, 0::INTEGER, now()::TIMESTAMP WITH TIME ZONE;
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

CREATE OR REPLACE FUNCTION public.check_contact_rate_limit(p_user_id uuid)
RETURNS TABLE(allowed boolean, remaining integer, reset_at timestamptz)
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

-- Cleanup function
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
```

### الخطوة 3: إضافة Triggers

```sql
-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_factories_updated_at
  BEFORE UPDATE ON factories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_import_orders_updated_at
  BEFORE UPDATE ON import_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_requests_updated_at
  BEFORE UPDATE ON service_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_factory_searches_updated_at
  BEFORE UPDATE ON factory_searches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### الخطوة 4: تفعيل RLS

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE factories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE factory_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE factory_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_access_log ENABLE ROW LEVEL SECURITY;
```

### الخطوة 5: إضافة RLS Policies

(يرجى مراجعة ملف `supabase/migrations/` الأصلي للسياسات الكاملة)

## 3. إعداد Edge Functions

### نشر الـ Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref zgrdqjtckbuvgxrustqi

# Deploy functions
supabase functions deploy api
supabase functions deploy factory-search
supabase functions deploy ai-chat
```

### إضافة الـ Secrets

في Supabase Dashboard → Settings → Edge Functions → Secrets:

- `FIRECRAWL_API_KEY`: مفتاح Firecrawl الخاص بك
- `PERPLEXITY_API_KEY`: مفتاح Perplexity الخاص بك

## 4. تحديث إعدادات المصادقة

في Supabase Dashboard → Authentication → Settings:

1. Site URL: `https://your-domain.com`
2. Redirect URLs: أضف جميع الـ URLs المسموح بها
3. Email Templates: عدّل حسب الحاجة

## 5. تحديث ملف .env

```env
VITE_SUPABASE_URL=https://zgrdqjtckbuvgxrustqi.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=zgrdqjtckbuvgxrustqi
```

## 6. نشر Frontend

### Railway

```bash
# In Railway dashboard:
# Build command: npm run build
# Start command: (none - static site)
# Publish directory: dist
```

### Vercel

```bash
npx vercel
```

### Netlify

```bash
npx netlify deploy --prod
```

## ملاحظات مهمة

1. **لا تنسى تفعيل Auto-confirm email** في إعدادات المصادقة
2. **راجع RLS policies** بعناية للتأكد من الأمان
3. **احتفظ بنسخة احتياطية** من قاعدة البيانات قبل أي تغييرات
