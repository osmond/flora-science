import { createClient } from '@supabase/supabase-js'

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
      plants: {
        Row: {
          id: string
          nickname: string
          species: string
          status: string
          hydration: number
          note: string | null
          room_id: string | null
          last_watered: string | null
          next_due: string | null
          photos: string[] | null
        }
        Insert: {
          id?: string
          nickname: string
          species: string
          status?: string
          hydration?: number
          note?: string | null
          room_id?: string | null
          last_watered?: string | null
          next_due?: string | null
          photos?: string[] | null
        }
        Update: {
          nickname?: string
          species?: string
          status?: string
          hydration?: number
          note?: string | null
          room_id?: string | null
          last_watered?: string | null
          next_due?: string | null
          photos?: string[] | null
        }
      }
      rooms: {
        Row: {
          id: string
          name: string
          avg_hydration: number | null
          tasks_due: number | null
        }
        Insert: {
          id?: string
          name: string
          avg_hydration?: number | null
          tasks_due?: number | null
        }
        Update: {
          name?: string
          avg_hydration?: number | null
          tasks_due?: number | null
        }
      }
      care_events: {
        Row: {
          id: string
          plant_id: string
          type: string
          date: string
          note: string | null
        }
        Insert: {
          id?: string
          plant_id: string
          type: string
          date: string
          note?: string | null
        }
        Update: {
          plant_id?: string
          type?: string
          date?: string
          note?: string | null
        }
      }
    }
  }
}

export type Plant = Database['public']['Tables']['plants']['Row']
export type Room = Database['public']['Tables']['rooms']['Row']
export type CareEvent = Database['public']['Tables']['care_events']['Row']

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
