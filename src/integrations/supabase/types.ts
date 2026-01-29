export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      conversations: {
        Row: {
          created_at: string
          factory_id: string | null
          id: string
          last_message_at: string | null
          participant_1_id: string | null
          participant_2_id: string | null
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          factory_id?: string | null
          id?: string
          last_message_at?: string | null
          participant_1_id?: string | null
          participant_2_id?: string | null
          type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          factory_id?: string | null
          id?: string
          last_message_at?: string | null
          participant_1_id?: string | null
          participant_2_id?: string | null
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_factory_id_fkey"
            columns: ["factory_id"]
            isOneToOne: false
            referencedRelation: "factories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_factory_id_fkey"
            columns: ["factory_id"]
            isOneToOne: false
            referencedRelation: "factories_public"
            referencedColumns: ["id"]
          },
        ]
      }
      factories: {
        Row: {
          category: string
          certifications: string[] | null
          city: string | null
          contact_email: string | null
          contact_phone: string | null
          country: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          description_en: string | null
          description_zh: string | null
          employees_count: string | null
          established_year: number | null
          export_countries: string[] | null
          founded_year: number | null
          id: string
          inspection_status:
            | Database["public"]["Enums"]["inspection_status"]
            | null
          is_direct_factory: boolean | null
          last_activity: string | null
          location: string | null
          logo_url: string | null
          main_products: string[] | null
          min_order_value: number | null
          name: string
          name_en: string | null
          name_zh: string | null
          owner_user_id: string | null
          production_capacity: string | null
          rating: number | null
          response_rate: number | null
          response_time: string | null
          reviews_count: number | null
          subcategory: string | null
          updated_at: string
          verification_documents: Json | null
          verification_score: number | null
          verification_status: string | null
          website_url: string | null
        }
        Insert: {
          category: string
          certifications?: string[] | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          description_zh?: string | null
          employees_count?: string | null
          established_year?: number | null
          export_countries?: string[] | null
          founded_year?: number | null
          id?: string
          inspection_status?:
            | Database["public"]["Enums"]["inspection_status"]
            | null
          is_direct_factory?: boolean | null
          last_activity?: string | null
          location?: string | null
          logo_url?: string | null
          main_products?: string[] | null
          min_order_value?: number | null
          name: string
          name_en?: string | null
          name_zh?: string | null
          owner_user_id?: string | null
          production_capacity?: string | null
          rating?: number | null
          response_rate?: number | null
          response_time?: string | null
          reviews_count?: number | null
          subcategory?: string | null
          updated_at?: string
          verification_documents?: Json | null
          verification_score?: number | null
          verification_status?: string | null
          website_url?: string | null
        }
        Update: {
          category?: string
          certifications?: string[] | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          description_zh?: string | null
          employees_count?: string | null
          established_year?: number | null
          export_countries?: string[] | null
          founded_year?: number | null
          id?: string
          inspection_status?:
            | Database["public"]["Enums"]["inspection_status"]
            | null
          is_direct_factory?: boolean | null
          last_activity?: string | null
          location?: string | null
          logo_url?: string | null
          main_products?: string[] | null
          min_order_value?: number | null
          name?: string
          name_en?: string | null
          name_zh?: string | null
          owner_user_id?: string | null
          production_capacity?: string | null
          rating?: number | null
          response_rate?: number | null
          response_time?: string | null
          reviews_count?: number | null
          subcategory?: string | null
          updated_at?: string
          verification_documents?: Json | null
          verification_score?: number | null
          verification_status?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      factory_results: {
        Row: {
          created_at: string
          email: string | null
          evidence: Json | null
          exclusion_reason: string | null
          id: string
          is_excluded: boolean | null
          is_verified_factory: boolean | null
          links: string[] | null
          location: string | null
          name: string
          name_zh: string | null
          red_flags: string[] | null
          score: number
          search_id: string
          verification_steps: string[] | null
          website: string | null
          why_factory: string[] | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          evidence?: Json | null
          exclusion_reason?: string | null
          id?: string
          is_excluded?: boolean | null
          is_verified_factory?: boolean | null
          links?: string[] | null
          location?: string | null
          name: string
          name_zh?: string | null
          red_flags?: string[] | null
          score?: number
          search_id: string
          verification_steps?: string[] | null
          website?: string | null
          why_factory?: string[] | null
        }
        Update: {
          created_at?: string
          email?: string | null
          evidence?: Json | null
          exclusion_reason?: string | null
          id?: string
          is_excluded?: boolean | null
          is_verified_factory?: boolean | null
          links?: string[] | null
          location?: string | null
          name?: string
          name_zh?: string | null
          red_flags?: string[] | null
          score?: number
          search_id?: string
          verification_steps?: string[] | null
          website?: string | null
          why_factory?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "factory_results_search_id_fkey"
            columns: ["search_id"]
            isOneToOne: false
            referencedRelation: "factory_searches"
            referencedColumns: ["id"]
          },
        ]
      }
      factory_searches: {
        Row: {
          created_at: string
          error_message: string | null
          expires_at: string | null
          id: string
          input_image_url: string | null
          input_value: string
          normalized_product: Json | null
          optional_params: Json | null
          results_count: number | null
          search_type: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          expires_at?: string | null
          id?: string
          input_image_url?: string | null
          input_value: string
          normalized_product?: Json | null
          optional_params?: Json | null
          results_count?: number | null
          search_type: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          expires_at?: string | null
          id?: string
          input_image_url?: string | null
          input_value?: string
          normalized_product?: Json | null
          optional_params?: Json | null
          results_count?: number | null
          search_type?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      import_orders: {
        Row: {
          created_at: string
          currency: string | null
          delivery_address: string | null
          estimated_price: number | null
          factory_id: string | null
          final_price: number | null
          id: string
          inspection_required: boolean | null
          notes: string | null
          product_description: string | null
          product_id: string | null
          product_name: string
          quantity: number
          shipping_cost: number | null
          shipping_method: string | null
          special_requirements: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string | null
          delivery_address?: string | null
          estimated_price?: number | null
          factory_id?: string | null
          final_price?: number | null
          id?: string
          inspection_required?: boolean | null
          notes?: string | null
          product_description?: string | null
          product_id?: string | null
          product_name: string
          quantity?: number
          shipping_cost?: number | null
          shipping_method?: string | null
          special_requirements?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string | null
          delivery_address?: string | null
          estimated_price?: number | null
          factory_id?: string | null
          final_price?: number | null
          id?: string
          inspection_required?: boolean | null
          notes?: string | null
          product_description?: string | null
          product_id?: string | null
          product_name?: string
          quantity?: number
          shipping_cost?: number | null
          shipping_method?: string | null
          special_requirements?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "import_orders_factory_id_fkey"
            columns: ["factory_id"]
            isOneToOne: false
            referencedRelation: "factories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_orders_factory_id_fkey"
            columns: ["factory_id"]
            isOneToOne: false
            referencedRelation: "factories_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: string[] | null
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          order_id: string | null
          read_at: string | null
          receiver_id: string | null
          sender_id: string
          sender_type: string
        }
        Insert: {
          attachments?: string[] | null
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          order_id?: string | null
          read_at?: string | null
          receiver_id?: string | null
          sender_id: string
          sender_type: string
        }
        Update: {
          attachments?: string[] | null
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          order_id?: string | null
          read_at?: string | null
          receiver_id?: string | null
          sender_id?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "import_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_documents: {
        Row: {
          created_at: string
          id: string
          name: string
          order_id: string
          type: string
          uploaded_by: string | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          order_id: string
          type: string
          uploaded_by?: string | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          order_id?: string
          type?: string
          uploaded_by?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_documents_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "import_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_timeline: {
        Row: {
          created_at: string
          description: string | null
          id: string
          order_id: string
          status: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          order_id: string
          status: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          order_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_timeline_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "import_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string
          currency: string | null
          customizable: boolean | null
          description: string | null
          factory_id: string
          hs_code: string | null
          id: string
          images: string[] | null
          is_featured: boolean | null
          lead_time: string | null
          max_order_quantity: number | null
          max_price: number | null
          min_order_quantity: number | null
          min_price: number | null
          name: string
          name_en: string | null
          name_zh: string | null
          price: number | null
          sample_available: boolean | null
          sample_price: number | null
          shipping_available: boolean | null
          specifications: Json | null
          stock_quantity: number | null
          subcategory: string | null
          unit: string | null
          updated_at: string
          views_count: number | null
        }
        Insert: {
          category: string
          created_at?: string
          currency?: string | null
          customizable?: boolean | null
          description?: string | null
          factory_id: string
          hs_code?: string | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          lead_time?: string | null
          max_order_quantity?: number | null
          max_price?: number | null
          min_order_quantity?: number | null
          min_price?: number | null
          name: string
          name_en?: string | null
          name_zh?: string | null
          price?: number | null
          sample_available?: boolean | null
          sample_price?: number | null
          shipping_available?: boolean | null
          specifications?: Json | null
          stock_quantity?: number | null
          subcategory?: string | null
          unit?: string | null
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          currency?: string | null
          customizable?: boolean | null
          description?: string | null
          factory_id?: string
          hs_code?: string | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          lead_time?: string | null
          max_order_quantity?: number | null
          max_price?: number | null
          min_order_quantity?: number | null
          min_price?: number | null
          name?: string
          name_en?: string | null
          name_zh?: string | null
          price?: number | null
          sample_available?: boolean | null
          sample_price?: number | null
          shipping_available?: boolean | null
          specifications?: Json | null
          stock_quantity?: number | null
          subcategory?: string | null
          unit?: string | null
          updated_at?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_factory_id_fkey"
            columns: ["factory_id"]
            isOneToOne: false
            referencedRelation: "factories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_factory_id_fkey"
            columns: ["factory_id"]
            isOneToOne: false
            referencedRelation: "factories_public"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          company_name: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_verified: boolean | null
          phone: string | null
          preferred_language: string | null
          subscription_end_date: string | null
          subscription_plan: string | null
          subscription_status: string | null
          updated_at: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"] | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          preferred_language?: string | null
          subscription_end_date?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          updated_at?: string
          user_id: string
          user_type?: Database["public"]["Enums"]["user_type"] | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          phone?: string | null
          preferred_language?: string | null
          subscription_end_date?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          updated_at?: string
          user_id?: string
          user_type?: Database["public"]["Enums"]["user_type"] | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          cost: number | null
          created_at: string
          currency: string | null
          details: Json | null
          id: string
          order_id: string | null
          status: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cost?: number | null
          created_at?: string
          currency?: string | null
          details?: Json | null
          id?: string
          order_id?: string | null
          status?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cost?: number | null
          created_at?: string
          currency?: string | null
          details?: Json | null
          id?: string
          order_id?: string | null
          status?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "import_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      factories_public: {
        Row: {
          category: string | null
          certifications: string[] | null
          city: string | null
          country: string | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          description_en: string | null
          description_zh: string | null
          employees_count: string | null
          established_year: number | null
          export_countries: string[] | null
          id: string | null
          is_direct_factory: boolean | null
          location: string | null
          logo_url: string | null
          main_products: string[] | null
          min_order_value: number | null
          name: string | null
          name_en: string | null
          name_zh: string | null
          production_capacity: string | null
          rating: number | null
          response_rate: number | null
          response_time: string | null
          reviews_count: number | null
          subcategory: string | null
          updated_at: string | null
          verification_score: number | null
          verification_status: string | null
          website_url: string | null
        }
        Insert: {
          category?: string | null
          certifications?: string[] | null
          city?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          description_zh?: string | null
          employees_count?: string | null
          established_year?: number | null
          export_countries?: string[] | null
          id?: string | null
          is_direct_factory?: boolean | null
          location?: string | null
          logo_url?: string | null
          main_products?: string[] | null
          min_order_value?: number | null
          name?: string | null
          name_en?: string | null
          name_zh?: string | null
          production_capacity?: string | null
          rating?: number | null
          response_rate?: number | null
          response_time?: string | null
          reviews_count?: number | null
          subcategory?: string | null
          updated_at?: string | null
          verification_score?: number | null
          verification_status?: string | null
          website_url?: string | null
        }
        Update: {
          category?: string | null
          certifications?: string[] | null
          city?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          description_en?: string | null
          description_zh?: string | null
          employees_count?: string | null
          established_year?: number | null
          export_countries?: string[] | null
          id?: string | null
          is_direct_factory?: boolean | null
          location?: string | null
          logo_url?: string | null
          main_products?: string[] | null
          min_order_value?: number | null
          name?: string | null
          name_en?: string | null
          name_zh?: string | null
          production_capacity?: string | null
          rating?: number | null
          response_rate?: number | null
          response_time?: string | null
          reviews_count?: number | null
          subcategory?: string | null
          updated_at?: string | null
          verification_score?: number | null
          verification_status?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      document_type:
        | "invoice"
        | "packing_list"
        | "certificate"
        | "inspection"
        | "other"
      inspection_status: "none" | "pending" | "completed"
      order_status:
        | "draft"
        | "inquiry"
        | "confirmed"
        | "shipped"
        | "delivered"
        | "cancelled"
      service_type: "inspection" | "shipping" | "customs" | "other"
      user_type: "buyer" | "factory" | "admin"
      verification_status: "pending" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      document_type: [
        "invoice",
        "packing_list",
        "certificate",
        "inspection",
        "other",
      ],
      inspection_status: ["none", "pending", "completed"],
      order_status: [
        "draft",
        "inquiry",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      service_type: ["inspection", "shipping", "customs", "other"],
      user_type: ["buyer", "factory", "admin"],
      verification_status: ["pending", "verified", "rejected"],
    },
  },
} as const
