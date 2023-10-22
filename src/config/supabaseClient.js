import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ueohlrqhtxiccauzwaoh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlb2hscnFodHhpY2NhdXp3YW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3Njk4NzksImV4cCI6MjAxMjM0NTg3OX0.36WvWAfRBxT6ranj1apTDM8xU_qfXzl62GSVaqtc5wo";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
