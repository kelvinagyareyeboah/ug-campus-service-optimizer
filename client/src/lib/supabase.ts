/**
 * Supabase Client — Single Instance
 *
 * This creates ONE Supabase client that the entire app shares.
 * It reads the URL and key from environment variables (.env file).
 *
 * Usage:
 *   import { supabase } from '../lib/supabase';
 *   const { data } = await supabase.from('profiles').select('*');
 */

import { createClient } from "@supabase/supabase-js";

// These come from the .env file (prefixed with VITE_ so Vite exposes them)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safety check — crash early if env vars are missing
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables!\n" +
      "Create a .env file in the client/ folder with:\n" +
      "  VITE_SUPABASE_URL=https://your-project.supabase.co\n" +
      "  VITE_SUPABASE_ANON_KEY=your-anon-key"
  );
}

// Create and export the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
