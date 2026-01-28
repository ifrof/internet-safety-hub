import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { mockFactories } from '@/data/mockData';

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
  verification_status: string | null;
  verification_score: number | null;
  is_direct_factory: boolean | null;
  rating: number | null;
  reviews_count: number | null;
  response_rate: number | null;
  response_time: string | null;
  min_order_value: number | null;
  main_products: string[] | null;
  export_countries: string[] | null;
  created_at: string;
  updated_at: string;
}

export const useFactories = (category?: string, searchQuery?: string) => {
  return useQuery({
    queryKey: ['factories', category, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('factories')
        .select('*')
        .eq('verification_status', 'verified');

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,name_en.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching factories:', error);
        // Return mock data as fallback
        return mockFactories.map(f => ({
          id: f.id,
          name: f.name,
          name_en: f.nameEn || null,
          name_zh: null,
          logo_url: f.logo,
          cover_image_url: f.coverImage,
          description: f.description,
          description_en: null,
          description_zh: null,
          location: f.location,
          city: f.city,
          country: f.country,
          category: f.category,
          subcategory: f.subcategory,
          established_year: f.establishedYear,
          employees_count: f.employeesCount,
          production_capacity: f.productionCapacity,
          certifications: f.certifications,
          verification_status: f.verificationStatus,
          verification_score: f.verificationScore,
          is_direct_factory: f.isDirectFactory,
          rating: f.rating,
          reviews_count: f.reviewsCount,
          response_rate: f.responseRate,
          response_time: f.responseTime,
          min_order_value: f.minOrderValue,
          main_products: f.mainProducts,
          export_countries: f.exportCountries,
          created_at: f.createdAt,
          updated_at: f.updatedAt,
        }));
      }

      // If no data from DB, return mock data
      if (!data || data.length === 0) {
        const mockData = mockFactories.map(f => ({
          id: f.id,
          name: f.name,
          name_en: f.nameEn || null,
          name_zh: null,
          logo_url: f.logo,
          cover_image_url: f.coverImage,
          description: f.description,
          description_en: null,
          description_zh: null,
          location: f.location,
          city: f.city,
          country: f.country,
          category: f.category,
          subcategory: f.subcategory,
          established_year: f.establishedYear,
          employees_count: f.employeesCount,
          production_capacity: f.productionCapacity,
          certifications: f.certifications,
          verification_status: f.verificationStatus,
          verification_score: f.verificationScore,
          is_direct_factory: f.isDirectFactory,
          rating: f.rating,
          reviews_count: f.reviewsCount,
          response_rate: f.responseRate,
          response_time: f.responseTime,
          min_order_value: f.minOrderValue,
          main_products: f.mainProducts,
          export_countries: f.exportCountries,
          created_at: f.createdAt,
          updated_at: f.updatedAt,
        }));

        // Apply filters to mock data
        let filtered = mockData;
        if (category && category !== 'all') {
          filtered = filtered.filter(f => f.category === category);
        }
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(f => 
            f.name.toLowerCase().includes(q) || 
            (f.main_products || []).some(p => p.toLowerCase().includes(q))
          );
        }
        return filtered;
      }

      return data as Factory[];
    },
  });
};

export const useFactory = (id: string) => {
  return useQuery({
    queryKey: ['factory', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('factories')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) {
        // Return mock data as fallback
        const mockFactory = mockFactories.find(f => f.id === id);
        if (mockFactory) {
          return {
            id: mockFactory.id,
            name: mockFactory.name,
            name_en: mockFactory.nameEn || null,
            name_zh: null,
            logo_url: mockFactory.logo,
            cover_image_url: mockFactory.coverImage,
            description: mockFactory.description,
            description_en: null,
            description_zh: null,
            location: mockFactory.location,
            city: mockFactory.city,
            country: mockFactory.country,
            category: mockFactory.category,
            subcategory: mockFactory.subcategory,
            established_year: mockFactory.establishedYear,
            employees_count: mockFactory.employeesCount,
            production_capacity: mockFactory.productionCapacity,
            certifications: mockFactory.certifications,
            verification_status: mockFactory.verificationStatus,
            verification_score: mockFactory.verificationScore,
            is_direct_factory: mockFactory.isDirectFactory,
            rating: mockFactory.rating,
            reviews_count: mockFactory.reviewsCount,
            response_rate: mockFactory.responseRate,
            response_time: mockFactory.responseTime,
            min_order_value: mockFactory.minOrderValue,
            main_products: mockFactory.mainProducts,
            export_countries: mockFactory.exportCountries,
            created_at: mockFactory.createdAt,
            updated_at: mockFactory.updatedAt,
          } as Factory;
        }
        return null;
      }

      return data as Factory;
    },
    enabled: !!id,
  });
};
