import { createClient } from "@supabase/supabase-js";

// These values should be set in your environment variables
// For local development, you can use a .env file
// Vite uses import.meta.env instead of process.env
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// For development, if no environment variables are set, use mock values
const fallbackUrl = "https://hbnrwzumdonidkrakaqk.supabase.co";
const fallbackKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibnJ3enVtZG9uaWRrcmFrYXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDY1NzEsImV4cCI6MjA2MTA4MjU3MX0.PZEP9QSovTcXQgUXL7iVHopZAoN9cPGwRHHhwltOqSE";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackKey
);

console.log(
  "Supabase client initialized with URL:",
  supabaseUrl || fallbackUrl
);

export default supabase;
