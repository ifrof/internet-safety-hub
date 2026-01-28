-- 1. Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- 3. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create security definer function to check roles (prevents RLS recursion)
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

-- 5. RLS policies for user_roles table
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- 6. Create a view for factories that hides contact info from non-subscribers
CREATE VIEW public.factories_public
WITH (security_invoker=on) AS
SELECT 
  id, name, name_en, name_zh, logo_url, cover_image_url,
  description, description_en, description_zh,
  location, city, country, category, subcategory,
  established_year, employees_count, production_capacity,
  certifications, verification_status, verification_score,
  is_direct_factory, rating, reviews_count, response_rate, response_time,
  min_order_value, main_products, export_countries, website_url,
  created_at, updated_at
  -- EXCLUDES: contact_email, contact_phone
FROM public.factories;

-- 7. Drop existing problematic policies on factories
DROP POLICY IF EXISTS "Anyone can view verified factories" ON public.factories;
DROP POLICY IF EXISTS "Admins can manage factories" ON public.factories;

-- 8. Create proper RLS policies for factories
CREATE POLICY "Anyone can view verified factories via view"
ON public.factories FOR SELECT
USING (verification_status = 'verified');

CREATE POLICY "Admins can manage all factories"
ON public.factories FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Premium users can view contact info"
ON public.factories FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.subscription_plan IN ('premium', 'basic')
  )
);

-- 9. Fix products table - add proper management policies
CREATE POLICY "Admins can manage products"
ON public.products FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- 10. Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- 11. Add UPDATE policy for messages (mark as read)
CREATE POLICY "Users can update own messages"
ON public.messages FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM conversations 
  WHERE conversations.id = messages.conversation_id 
  AND conversations.user_id = auth.uid()
));

-- 12. Add UPDATE policy for conversations
CREATE POLICY "Users can update own conversations"
ON public.conversations FOR UPDATE
USING (user_id = auth.uid());