import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type ManufacturingType = 'OEM' | 'ODM' | 'Private Label' | 'OEM/ODM';

export interface Factory {
  id: string;
  name: string;
  name_en: string | null;
  name_zh: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  description: string | null;
  description_en: string | null;
  description_zh: string | null;
  location: string | null;
  city: string | null;
  country: string | null;
  category: string;
  subcategory: string | null;
  established_year: number | null;
  employees_count: string | null;
  production_capacity: string | null;
  certifications: string[] | null;
  manufacturing_types?: ManufacturingType[] | null;
  verification_status: string | null;
  verification_score: number | null;
  is_direct_factory: boolean | null;
  rating: number | null;
  reviews_count: number | null;
  response_rate: number | null;
  response_time: string | null;
  min_order_value: number | null;
  main_products: string[] | null;
  contact_email: string | null;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
}

export const useFactories = (category?: string, searchQuery?: string) => {
  return useQuery({
    queryKey: ['factories', category, searchQuery],
    queryFn: async () => {
      // Use the secure view to prevent scraping of sensitive data
      let query = supabase
        .from('factories_secure' as any)
        .select('*');

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,name_en.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching factories:', error);
        return [];
      }

      return data as Factory[];
    },
  });
};

export const useFactory = (id: string) => {
  return useQuery({
    queryKey: ['factory', id],
    queryFn: async () => {
      // Fetching from the main table is allowed for individual factory view,
      // but RLS will still protect the data.
      const { data, error } = await supabase
        .from('factories')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        console.error('Error fetching factory:', error);
        return null;
      }

      return data as Factory;
    },
    enabled: !!id,
  });
};
