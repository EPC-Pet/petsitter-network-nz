/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

import { createClient } from '@supabase/supabase-js'

// Use Vite env variables on the client. Defaults to empty string to avoid runtime errors.
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? '') as string
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '') as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
