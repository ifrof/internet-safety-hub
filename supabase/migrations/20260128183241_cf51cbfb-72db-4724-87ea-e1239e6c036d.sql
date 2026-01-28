-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  country TEXT DEFAULT 'SA',
  city TEXT,
  avatar_url TEXT,
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('active', 'inactive', 'trial')),
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'basic', 'premium')),
  subscription_end_date TIMESTAMPTZ,
  preferred_language TEXT DEFAULT 'ar' CHECK (preferred_language IN ('ar', 'en', 'zh')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create factories table
CREATE TABLE public.factories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  description TEXT,
  description_en TEXT,
  description_zh TEXT,
  location TEXT,
  city TEXT,
  country TEXT DEFAULT 'CN',
  category TEXT NOT NULL,
  subcategory TEXT,
  established_year INTEGER,
  employees_count TEXT,
  production_capacity TEXT,
  certifications TEXT[],
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('verified', 'pending', 'rejected')),
  verification_score INTEGER DEFAULT 0,
  is_direct_factory BOOLEAN DEFAULT true,
  rating NUMERIC(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  response_rate INTEGER DEFAULT 0,
  response_time TEXT,
  min_order_value NUMERIC(10,2) DEFAULT 0,
  main_products TEXT[],
  export_countries TEXT[],
  contact_email TEXT,
  contact_phone TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  factory_id UUID NOT NULL REFERENCES public.factories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  description TEXT,
  images TEXT[],
  category TEXT NOT NULL,
  subcategory TEXT,
  price NUMERIC(10,2),
  min_price NUMERIC(10,2),
  max_price NUMERIC(10,2),
  currency TEXT DEFAULT 'USD',
  min_order_quantity INTEGER DEFAULT 1,
  unit TEXT DEFAULT 'piece',
  specifications JSONB DEFAULT '{}',
  customizable BOOLEAN DEFAULT false,
  lead_time TEXT,
  sample_available BOOLEAN DEFAULT false,
  sample_price NUMERIC(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create import_orders table
CREATE TABLE public.import_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  factory_id UUID REFERENCES public.factories(id),
  product_id UUID REFERENCES public.products(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'confirmed', 'production', 'shipping', 'delivered', 'cancelled')),
  product_name TEXT NOT NULL,
  product_description TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  estimated_price NUMERIC(12,2),
  final_price NUMERIC(12,2),
  currency TEXT DEFAULT 'USD',
  shipping_method TEXT,
  shipping_cost NUMERIC(10,2),
  inspection_required BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create order_documents table
CREATE TABLE public.order_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.import_orders(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('invoice', 'packing_list', 'bill_of_lading', 'certificate_of_origin', 'bank_transfer', 'inspection_report', 'other')),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  uploaded_by TEXT DEFAULT 'user' CHECK (uploaded_by IN ('user', 'factory', 'platform')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create order_timeline table
CREATE TABLE public.order_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.import_orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create messages table for chat
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  sender_id UUID NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'factory', 'ai', 'support')),
  content TEXT NOT NULL,
  attachments TEXT[],
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create conversations table
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('factory_chat', 'support', 'ai_assistant')),
  factory_id UUID REFERENCES public.factories(id),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create service_requests table
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('inspection', 'shipping_quote', 'quality_check', 'money_transfer', 'customs', 'sourcing', 'custom')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Factories policies (public read)
CREATE POLICY "Anyone can view verified factories" ON public.factories FOR SELECT USING (verification_status = 'verified');
CREATE POLICY "Admins can manage factories" ON public.factories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND subscription_plan = 'premium')
);

-- Products policies (public read)
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- Orders policies
CREATE POLICY "Users can view own orders" ON public.import_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.import_orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own orders" ON public.import_orders FOR UPDATE USING (auth.uid() = user_id);

-- Order documents policies
CREATE POLICY "Users can view own order documents" ON public.order_documents FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.import_orders WHERE id = order_id AND user_id = auth.uid()));
CREATE POLICY "Users can add documents to own orders" ON public.order_documents FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.import_orders WHERE id = order_id AND user_id = auth.uid()));

-- Order timeline policies
CREATE POLICY "Users can view own order timeline" ON public.order_timeline FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.import_orders WHERE id = order_id AND user_id = auth.uid()));

-- Messages policies
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.conversations WHERE id = conversation_id AND user_id = auth.uid()));
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.conversations WHERE id = conversation_id AND user_id = auth.uid()));

-- Conversations policies
CREATE POLICY "Users can view own conversations" ON public.conversations FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT WITH CHECK (user_id = auth.uid());

-- Service requests policies
CREATE POLICY "Users can view own service requests" ON public.service_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create service requests" ON public.service_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own service requests" ON public.service_requests FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_factories_updated_at BEFORE UPDATE ON public.factories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.import_orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON public.service_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();