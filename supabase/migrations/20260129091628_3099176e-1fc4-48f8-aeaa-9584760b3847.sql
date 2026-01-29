-- Fix the profiles authentication policy - make it restrictive to only own profile
-- The issue is that "Require authentication for profiles" allows any authenticated user to view all profiles
DROP POLICY IF EXISTS "Require authentication for profiles" ON public.profiles;

-- The existing policy "Users can view own profile" already restricts to (auth.uid() = user_id)
-- So we just needed to remove the overly permissive policy

-- Fix the factory owner conversation policy to ensure proper matching
DROP POLICY IF EXISTS "Factory owners can view conversations" ON public.conversations;
CREATE POLICY "Factory owners can view conversations" ON public.conversations
FOR SELECT USING (
  factory_id IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM factories 
    WHERE factories.id = conversations.factory_id 
    AND factories.owner_user_id = auth.uid()
  )
);

-- Fix messages INSERT policy to verify sender_id matches current user
DROP POLICY IF EXISTS "Users can send messages" ON public.messages;
CREATE POLICY "Users can send messages" ON public.messages
FOR INSERT WITH CHECK (
  sender_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM conversations
    WHERE conversations.id = messages.conversation_id 
    AND conversations.user_id = auth.uid()
  )
);

-- Fix factory owner messages INSERT to verify ownership
DROP POLICY IF EXISTS "Factory owners can send messages" ON public.messages;
CREATE POLICY "Factory owners can send messages" ON public.messages
FOR INSERT WITH CHECK (
  sender_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM conversations c
    JOIN factories f ON f.id = c.factory_id
    WHERE c.id = messages.conversation_id 
    AND f.owner_user_id = auth.uid()
  )
);

-- Fix factory searches to require user_id to be set
DROP POLICY IF EXISTS "Authenticated users can create searches" ON public.factory_searches;
CREATE POLICY "Authenticated users can create searches" ON public.factory_searches
FOR INSERT WITH CHECK (user_id = auth.uid() AND user_id IS NOT NULL);