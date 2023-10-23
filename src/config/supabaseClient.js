import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
