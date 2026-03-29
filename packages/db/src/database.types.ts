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
    PostgrestVersion: "14.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          actor_user_id: string | null
          created_at: string
          id: string
          metadata: Json
          target_id: string
          target_type: string
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          target_id: string
          target_type: string
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_actor_user_id_fkey"
            columns: ["actor_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
        }
        Relationships: []
      }
      loyalty_events: {
        Row: {
          created_at: string
          description: string | null
          id: string
          points_delta: number
          reason: Database["public"]["Enums"]["loyalty_event_reason"]
          redemption_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          points_delta: number
          reason: Database["public"]["Enums"]["loyalty_event_reason"]
          redemption_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          points_delta?: number
          reason?: Database["public"]["Enums"]["loyalty_event_reason"]
          redemption_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_events_redemption_id_fkey"
            columns: ["redemption_id"]
            isOneToOne: false
            referencedRelation: "redemptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_members: {
        Row: {
          accepted_at: string | null
          created_at: string
          id: string
          invited_at: string
          invited_by: string | null
          merchant_id: string
          role: Database["public"]["Enums"]["merchant_member_role"]
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          id?: string
          invited_at?: string
          invited_by?: string | null
          merchant_id: string
          role: Database["public"]["Enums"]["merchant_member_role"]
          user_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          id?: string
          invited_at?: string
          invited_by?: string | null
          merchant_id?: string
          role?: Database["public"]["Enums"]["merchant_member_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "merchant_members_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_members_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchant_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      merchants: {
        Row: {
          address_line_1: string
          address_line_2: string | null
          category_id: string
          city: string
          country: string
          cover_image_url: string | null
          created_at: string
          description: string | null
          founding_cohort: number | null
          id: string
          instagram_handle: string | null
          is_founding: boolean
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          name: string
          neighbourhood: string
          onboarding_fee_paid: boolean
          onboarding_fee_waived: boolean
          owner_user_id: string
          phone: string | null
          postal_code: string | null
          province: string
          renewal_date: string | null
          slug: string
          status: Database["public"]["Enums"]["merchant_status"]
          updated_at: string
          website_url: string | null
        }
        Insert: {
          address_line_1: string
          address_line_2?: string | null
          category_id: string
          city?: string
          country?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          founding_cohort?: number | null
          id?: string
          instagram_handle?: string | null
          is_founding?: boolean
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          neighbourhood: string
          onboarding_fee_paid?: boolean
          onboarding_fee_waived?: boolean
          owner_user_id: string
          phone?: string | null
          postal_code?: string | null
          province?: string
          renewal_date?: string | null
          slug: string
          status?: Database["public"]["Enums"]["merchant_status"]
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          address_line_1?: string
          address_line_2?: string | null
          category_id?: string
          city?: string
          country?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          founding_cohort?: number | null
          id?: string
          instagram_handle?: string | null
          is_founding?: boolean
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          neighbourhood?: string
          onboarding_fee_paid?: boolean
          onboarding_fee_waived?: boolean
          owner_user_id?: string
          phone?: string | null
          postal_code?: string | null
          province?: string
          renewal_date?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["merchant_status"]
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "merchants_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merchants_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          blackout_dates: string[]
          created_at: string
          description: string
          id: string
          is_active: boolean
          is_stackable: boolean
          max_discount_cents: number | null
          max_party_size: number | null
          merchant_id: string
          min_party_size: number
          min_spend_cents: number
          offer_type: Database["public"]["Enums"]["offer_type"]
          terms: string | null
          title: string
          updated_at: string
          valid_channels: Database["public"]["Enums"]["redemption_channel"][]
          valid_days: string[]
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          blackout_dates?: string[]
          created_at?: string
          description: string
          id?: string
          is_active?: boolean
          is_stackable?: boolean
          max_discount_cents?: number | null
          max_party_size?: number | null
          merchant_id: string
          min_party_size?: number
          min_spend_cents?: number
          offer_type: Database["public"]["Enums"]["offer_type"]
          terms?: string | null
          title: string
          updated_at?: string
          valid_channels?: Database["public"]["Enums"]["redemption_channel"][]
          valid_days?: string[]
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          blackout_dates?: string[]
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean
          is_stackable?: boolean
          max_discount_cents?: number | null
          max_party_size?: number | null
          merchant_id?: string
          min_party_size?: number
          min_spend_cents?: number
          offer_type?: Database["public"]["Enums"]["offer_type"]
          terms?: string | null
          title?: string
          updated_at?: string
          valid_channels?: Database["public"]["Enums"]["redemption_channel"][]
          valid_days?: string[]
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      redemptions: {
        Row: {
          bill_amount_cents: number | null
          channel: Database["public"]["Enums"]["redemption_channel"]
          confirmed_at: string | null
          confirmed_by: string | null
          created_at: string
          dispute_reason: string | null
          expires_at: string
          id: string
          issued_at: string
          merchant_id: string
          offer_id: string
          party_size: number | null
          status: Database["public"]["Enums"]["redemption_status"]
          token_hash: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bill_amount_cents?: number | null
          channel?: Database["public"]["Enums"]["redemption_channel"]
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          dispute_reason?: string | null
          expires_at: string
          id?: string
          issued_at?: string
          merchant_id: string
          offer_id: string
          party_size?: number | null
          status?: Database["public"]["Enums"]["redemption_status"]
          token_hash: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bill_amount_cents?: number | null
          channel?: Database["public"]["Enums"]["redemption_channel"]
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          dispute_reason?: string | null
          expires_at?: string
          id?: string
          issued_at?: string
          merchant_id?: string
          offer_id?: string
          party_size?: number | null
          status?: Database["public"]["Enums"]["redemption_status"]
          token_hash?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "redemptions_confirmed_by_fkey"
            columns: ["confirmed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_merchants: {
        Row: {
          created_at: string
          merchant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          merchant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          merchant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_merchants_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_merchants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          billing_source: Database["public"]["Enums"]["billing_source"]
          cancel_at: string | null
          canceled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          external_customer_id: string | null
          external_subscription_id: string | null
          id: string
          status: Database["public"]["Enums"]["subscription_status"]
          tier: Database["public"]["Enums"]["subscription_tier"]
          trial_end: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_source: Database["public"]["Enums"]["billing_source"]
          cancel_at?: string | null
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          external_customer_id?: string | null
          external_subscription_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          tier: Database["public"]["Enums"]["subscription_tier"]
          trial_end?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_source?: Database["public"]["Enums"]["billing_source"]
          cancel_at?: string | null
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          external_customer_id?: string | null
          external_subscription_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_end?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          points_balance: number
          role: Database["public"]["Enums"]["app_user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          points_balance?: number
          role?: Database["public"]["Enums"]["app_user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          points_balance?: number
          role?: Database["public"]["Enums"]["app_user_role"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      is_merchant_manager_or_owner: {
        Args: { _merchant_id: string }
        Returns: boolean
      }
      is_merchant_member: { Args: { _merchant_id: string }; Returns: boolean }
      points_for_redemption: { Args: never; Returns: number }
    }
    Enums: {
      app_user_role: "consumer" | "admin"
      billing_source: "apple" | "google" | "stripe"
      loyalty_event_reason:
        | "redemption_confirmed"
        | "manual_adjustment"
        | "coupon_unlock"
        | "referral_bonus"
        | "points_expired"
      merchant_member_role: "owner" | "manager" | "staff"
      merchant_status: "pending" | "active" | "suspended" | "churned"
      offer_type:
        | "bogo_item"
        | "free_item_with_purchase"
        | "fixed_credit"
        | "percentage_discount"
        | "upgrade"
        | "exclusive_access"
      redemption_channel: "dine_in" | "takeout" | "in_store"
      redemption_status:
        | "issued"
        | "confirmed"
        | "expired"
        | "voided"
        | "disputed"
      subscription_status:
        | "inactive"
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
      subscription_tier: "general" | "student_senior" | "premium"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_user_role: ["consumer", "admin"],
      billing_source: ["apple", "google", "stripe"],
      loyalty_event_reason: [
        "redemption_confirmed",
        "manual_adjustment",
        "coupon_unlock",
        "referral_bonus",
        "points_expired",
      ],
      merchant_member_role: ["owner", "manager", "staff"],
      merchant_status: ["pending", "active", "suspended", "churned"],
      offer_type: [
        "bogo_item",
        "free_item_with_purchase",
        "fixed_credit",
        "percentage_discount",
        "upgrade",
        "exclusive_access",
      ],
      redemption_channel: ["dine_in", "takeout", "in_store"],
      redemption_status: [
        "issued",
        "confirmed",
        "expired",
        "voided",
        "disputed",
      ],
      subscription_status: [
        "inactive",
        "trialing",
        "active",
        "past_due",
        "canceled",
      ],
      subscription_tier: ["general", "student_senior", "premium"],
    },
  },
} as const
