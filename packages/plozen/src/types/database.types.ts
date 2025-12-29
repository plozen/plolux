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
      inquiries: {
        Row: {
          author_name: string
          content: string
          created_at: string
          id: string
          is_notice: boolean | null
          is_private: boolean | null
          password: string
          seq_id: number
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          author_name: string
          content: string
          created_at?: string
          id?: string
          is_notice?: boolean | null
          is_private?: boolean | null
          password: string
          seq_id?: number
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          is_notice?: boolean | null
          is_private?: boolean | null
          password?: string
          seq_id?: number
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      project_requests: {
        Row: {
          budget_range: string | null
          client_name: string
          company_name: string | null
          contact_email: string
          contact_phone: string | null
          created_at: string | null
          description: string
          id: string
          ip_address: unknown
          project_type: string | null
          reference_urls: string | null
          status: string | null
          target_deadline: string | null
        }
        Insert: {
          budget_range?: string | null
          client_name: string
          company_name?: string | null
          contact_email: string
          contact_phone?: string | null
          created_at?: string | null
          description: string
          id?: string
          ip_address?: unknown
          project_type?: string | null
          reference_urls?: string | null
          status?: string | null
          target_deadline?: string | null
        }
        Update: {
          budget_range?: string | null
          client_name?: string
          company_name?: string | null
          contact_email?: string
          contact_phone?: string | null
          created_at?: string | null
          description?: string
          id?: string
          ip_address?: unknown
          project_type?: string | null
          reference_urls?: string | null
          status?: string | null
          target_deadline?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      inquiries_list_view: {
        Row: {
          id: string
          seq_id: number
          title: string
          author_name: string
          created_at: string
          view_count: number | null
          is_private: boolean | null
          is_notice: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_inquiry_content: {
        Args: {
          p_id: string
          p_password?: string
        }
        Returns: {
          content: string
          is_private: boolean
        }[]
      }
      update_inquiry: {
        Args: {
          p_id: string
          p_password?: string
          p_title?: string
          p_content?: string
          p_author_name?: string
          p_is_private?: boolean
        }
        Returns: boolean
      }
      delete_inquiry: {
        Args: {
          p_id: string
          p_password?: string
        }
        Returns: boolean
      }
      increment_inquiry_view: {
        Args: {
          p_id: string
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


type PublicSchema = Database[Extract<keyof Database, "public">]
type ValidSchema = Exclude<keyof Database, "__InternalSupabase">

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: ValidSchema },
  TableName extends PublicTableNameOrOptions extends { schema: ValidSchema }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: ValidSchema }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: ValidSchema },
  TableName extends PublicTableNameOrOptions extends { schema: ValidSchema }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: ValidSchema }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: ValidSchema },
  TableName extends PublicTableNameOrOptions extends { schema: ValidSchema }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: ValidSchema }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: ValidSchema },
  EnumName extends PublicEnumNameOrOptions extends { schema: ValidSchema }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: ValidSchema }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: ValidSchema },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: ValidSchema
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: ValidSchema }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
