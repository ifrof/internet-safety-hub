-- Create table for factory searches
CREATE TABLE public.factory_searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  search_type TEXT NOT NULL CHECK (search_type IN ('image', 'url', 'name', 'hs_code')),
  input_value TEXT NOT NULL,
  input_image_url TEXT,
  optional_params JSONB DEFAULT '{}'::jsonb,
  normalized_product JSONB,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '24 hours')
);

-- Create table for factory results
CREATE TABLE public.factory_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  search_id UUID NOT NULL REFERENCES public.factory_searches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_zh TEXT,
  location TEXT,
  website TEXT,
  links TEXT[] DEFAULT '{}',
  score INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  why_factory TEXT[] DEFAULT '{}',
  evidence JSONB DEFAULT '[]'::jsonb,
  red_flags TEXT[] DEFAULT '{}',
  verification_steps TEXT[] DEFAULT '{}',
  is_excluded BOOLEAN DEFAULT false,
  exclusion_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.factory_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factory_results ENABLE ROW LEVEL SECURITY;

-- RLS policies for factory_searches
CREATE POLICY "Anyone can create searches" 
ON public.factory_searches 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view own searches" 
ON public.factory_searches 
FOR SELECT 
USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Anyone can update own searches" 
ON public.factory_searches 
FOR UPDATE 
USING (user_id = auth.uid() OR user_id IS NULL);

-- RLS policies for factory_results
CREATE POLICY "Anyone can view results" 
ON public.factory_results 
FOR SELECT 
USING (true);

CREATE POLICY "System can insert results" 
ON public.factory_results 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_factory_searches_status ON public.factory_searches(status);
CREATE INDEX idx_factory_searches_expires ON public.factory_searches(expires_at);
CREATE INDEX idx_factory_results_search_id ON public.factory_results(search_id);
CREATE INDEX idx_factory_results_score ON public.factory_results(score DESC);

-- Add trigger for updated_at
CREATE TRIGGER update_factory_searches_updated_at
BEFORE UPDATE ON public.factory_searches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();