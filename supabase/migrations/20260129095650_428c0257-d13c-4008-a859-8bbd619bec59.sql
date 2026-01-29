-- Add policy for authenticated users to view verified factories
CREATE POLICY "Authenticated users can view verified factories" 
ON public.factories 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND verification_status = 'verified'
);

-- Add policy for public to view factories_public view (which is already public)
DROP POLICY IF EXISTS "Anyone can view factories_public" ON public.factories;
CREATE POLICY "Anyone can view factories_public" 
ON public.factories 
FOR SELECT 
USING (verification_status = 'verified');