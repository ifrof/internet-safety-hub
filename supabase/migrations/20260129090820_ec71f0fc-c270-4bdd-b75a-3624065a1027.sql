-- Fix 1: Restrict factory_results to only users who own the associated search
DROP POLICY IF EXISTS "Anyone can view results" ON public.factory_results;

CREATE POLICY "Users can view own search results" ON public.factory_results
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM factory_searches 
    WHERE factory_searches.id = factory_results.search_id 
    AND factory_searches.user_id = auth.uid()
  )
);

-- Fix 2: Restrict factory_searches to only authenticated users viewing their own searches
DROP POLICY IF EXISTS "Anyone can view own searches" ON public.factory_searches;

CREATE POLICY "Users can view own searches" ON public.factory_searches
FOR SELECT USING (user_id = auth.uid());

-- Also update the update policy to be stricter
DROP POLICY IF EXISTS "Anyone can update own searches" ON public.factory_searches;

CREATE POLICY "Users can update own searches" ON public.factory_searches
FOR UPDATE USING (user_id = auth.uid());

-- Fix 3: Ensure factory contact info is only visible through the edge function
-- The factories table already has RLS, but we need to ensure the SELECT policies
-- work correctly. The premium policy should be the ONLY way to access contact info.

-- Remove the general verified factories policy that might expose contact info
DROP POLICY IF EXISTS "Anyone can view verified factories via view" ON public.factories;

-- Create a policy that allows viewing public factory info (without contact details)
-- But since we can't do column-level RLS, we'll rely on the factories_public view
-- and deny direct access to factories table for non-premium users

-- First, ensure the factories_public view exists and excludes contact info
DROP VIEW IF EXISTS public.factories_public;

CREATE VIEW public.factories_public
WITH (security_invoker = on)
AS SELECT 
  id,
  name,
  name_en,
  name_zh,
  description,
  description_en,
  description_zh,
  category,
  subcategory,
  location,
  city,
  country,
  logo_url,
  cover_image_url,
  certifications,
  main_products,
  production_capacity,
  employees_count,
  established_year,
  export_countries,
  rating,
  reviews_count,
  response_rate,
  response_time,
  min_order_value,
  is_direct_factory,
  verification_status,
  verification_score,
  website_url,
  created_at,
  updated_at
  -- EXCLUDED: contact_email, contact_phone, owner_user_id, verification_documents
FROM public.factories
WHERE verification_status = 'verified';

-- Update factories RLS: deny direct SELECT for non-admins/non-premium
-- Only allow premium users and admins to query factories table directly
DROP POLICY IF EXISTS "Premium users can view contact info" ON public.factories;

-- Admins can see everything
-- Premium/basic users can view contact info through the edge function (which uses service role)
-- Regular users should use the public view

-- Create policy for factory owners to view their own factory
CREATE POLICY "Factory owners can view own factory" ON public.factories
FOR SELECT USING (owner_user_id = auth.uid());

-- Fix 4: Add policies for factory owners to participate in the system

-- Allow factory owners to view conversations where their factory is involved
DROP POLICY IF EXISTS "Factory owners can view conversations" ON public.conversations;

CREATE POLICY "Factory owners can view conversations" ON public.conversations
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM factories 
    WHERE factories.id = conversations.factory_id 
    AND factories.owner_user_id = auth.uid()
  )
);

-- Allow factory owners to view messages in their conversations
DROP POLICY IF EXISTS "Factory owners can view messages" ON public.messages;

CREATE POLICY "Factory owners can view messages" ON public.messages
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM conversations c
    JOIN factories f ON f.id = c.factory_id
    WHERE c.id = messages.conversation_id 
    AND f.owner_user_id = auth.uid()
  )
);

-- Allow factory owners to send messages in their conversations
CREATE POLICY "Factory owners can send messages" ON public.messages
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM conversations c
    JOIN factories f ON f.id = c.factory_id
    WHERE c.id = messages.conversation_id 
    AND f.owner_user_id = auth.uid()
  )
);

-- Allow factory owners to view orders placed with their factory
CREATE POLICY "Factory owners can view orders" ON public.import_orders
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM factories 
    WHERE factories.id = import_orders.factory_id 
    AND factories.owner_user_id = auth.uid()
  )
);

-- Allow factory owners to update order status for their orders
CREATE POLICY "Factory owners can update orders" ON public.import_orders
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM factories 
    WHERE factories.id = import_orders.factory_id 
    AND factories.owner_user_id = auth.uid()
  )
);

-- Allow factory owners to view and add order documents
CREATE POLICY "Factory owners can view order documents" ON public.order_documents
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM import_orders o
    JOIN factories f ON f.id = o.factory_id
    WHERE o.id = order_documents.order_id 
    AND f.owner_user_id = auth.uid()
  )
);

CREATE POLICY "Factory owners can add order documents" ON public.order_documents
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM import_orders o
    JOIN factories f ON f.id = o.factory_id
    WHERE o.id = order_documents.order_id 
    AND f.owner_user_id = auth.uid()
  )
);

-- Allow factory owners to manage their own products
CREATE POLICY "Factory owners can view own products" ON public.products
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM factories 
    WHERE factories.id = products.factory_id 
    AND factories.owner_user_id = auth.uid()
  )
);

CREATE POLICY "Factory owners can insert products" ON public.products
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM factories 
    WHERE factories.id = products.factory_id 
    AND factories.owner_user_id = auth.uid()
  )
);

CREATE POLICY "Factory owners can update products" ON public.products
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM factories 
    WHERE factories.id = products.factory_id 
    AND factories.owner_user_id = auth.uid()
  )
);

CREATE POLICY "Factory owners can delete products" ON public.products
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM factories 
    WHERE factories.id = products.factory_id 
    AND factories.owner_user_id = auth.uid()
  )
);

-- Allow admins to view all service requests
CREATE POLICY "Admins can view all service requests" ON public.service_requests
FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update service requests" ON public.service_requests
FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));