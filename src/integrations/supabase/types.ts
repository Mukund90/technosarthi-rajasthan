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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          role?: string
          session_id?: string
        }
        Relationships: []
      }
      colleges: {
        Row: {
          affiliation: string | null
          college_type: Database["public"]["Enums"]["college_type"]
          created_at: string | null
          description: string | null
          district: string
          email: string | null
          established_year: number | null
          facilities: string[] | null
          id: string
          image_url: string | null
          location: string
          name: string
          phone: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          affiliation?: string | null
          college_type: Database["public"]["Enums"]["college_type"]
          created_at?: string | null
          description?: string | null
          district: string
          email?: string | null
          established_year?: number | null
          facilities?: string[] | null
          id?: string
          image_url?: string | null
          location: string
          name: string
          phone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          affiliation?: string | null
          college_type?: Database["public"]["Enums"]["college_type"]
          created_at?: string | null
          description?: string | null
          district?: string
          email?: string | null
          established_year?: number | null
          facilities?: string[] | null
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          college_id: string | null
          course_name: string
          course_type: Database["public"]["Enums"]["course_type"]
          created_at: string | null
          description: string | null
          duration: string
          fees_per_year: number
          id: string
          total_seats: number
          updated_at: string | null
        }
        Insert: {
          college_id?: string | null
          course_name: string
          course_type: Database["public"]["Enums"]["course_type"]
          created_at?: string | null
          description?: string | null
          duration: string
          fees_per_year: number
          id?: string
          total_seats: number
          updated_at?: string | null
        }
        Update: {
          college_id?: string | null
          course_name?: string
          course_type?: Database["public"]["Enums"]["course_type"]
          created_at?: string | null
          description?: string | null
          duration?: string
          fees_per_year?: number
          id?: string
          total_seats?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      cutoffs: {
        Row: {
          category: string
          closing_rank: number | null
          course_id: string | null
          created_at: string | null
          id: string
          opening_rank: number | null
          updated_at: string | null
          year: number
        }
        Insert: {
          category: string
          closing_rank?: number | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          opening_rank?: number | null
          updated_at?: string | null
          year: number
        }
        Update: {
          category?: string
          closing_rank?: number | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          opening_rank?: number | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "cutoffs_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      placements: {
        Row: {
          average_package: number | null
          college_id: string | null
          created_at: string | null
          highest_package: number | null
          id: string
          median_package: number | null
          students_placed: number | null
          top_recruiters: string[] | null
          total_students: number | null
          updated_at: string | null
          year: number
        }
        Insert: {
          average_package?: number | null
          college_id?: string | null
          created_at?: string | null
          highest_package?: number | null
          id?: string
          median_package?: number | null
          students_placed?: number | null
          top_recruiters?: string[] | null
          total_students?: number | null
          updated_at?: string | null
          year: number
        }
        Update: {
          average_package?: number | null
          college_id?: string | null
          created_at?: string | null
          highest_package?: number | null
          id?: string
          median_package?: number | null
          students_placed?: number | null
          top_recruiters?: string[] | null
          total_students?: number | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "placements_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      college_type: "Engineering" | "Polytechnic" | "ITI" | "Management"
      course_type: "B.Tech" | "M.Tech" | "Diploma" | "ITI" | "MBA" | "MCA"
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
      college_type: ["Engineering", "Polytechnic", "ITI", "Management"],
      course_type: ["B.Tech", "M.Tech", "Diploma", "ITI", "MBA", "MCA"],
    },
  },
} as const
