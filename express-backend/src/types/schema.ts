export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      appliance: {
        Row: {
          appliance_name: string
          appliance_type: number
          id: number
          profile_id: string
          room: string
        }
        Insert: {
          appliance_name: string
          appliance_type: number
          id?: number
          profile_id: string
          room: string
        }
        Update: {
          appliance_name?: string
          appliance_type?: number
          id?: number
          profile_id?: string
          room?: string
        }
        Relationships: [
          {
            foreignKeyName: "appliance_appliance_type_fkey"
            columns: ["appliance_type"]
            referencedRelation: "appliance_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appliance_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      appliance_type: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      message: {
        Row: {
          id: number
          is_chatgpt: boolean
          is_routine: boolean
          message: string
          profile_id: string
          timestamp: string
        }
        Insert: {
          id?: number
          is_chatgpt: boolean
          is_routine: boolean
          message: string
          profile_id: string
          timestamp?: string
        }
        Update: {
          id?: number
          is_chatgpt?: boolean
          is_routine?: boolean
          message?: string
          profile_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          ifttt_key: string | null
          username: string | null
        }
        Insert: {
          id: string
          ifttt_key?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          ifttt_key?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      routine: {
        Row: {
          id: number
          json: Json | null
          profile_id: string
          routine_name: string
        }
        Insert: {
          id?: number
          json?: Json | null
          profile_id: string
          routine_name: string
        }
        Update: {
          id?: number
          json?: Json | null
          profile_id?: string
          routine_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "routine_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

