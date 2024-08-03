import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ehaebuzyiwwkzauubkjq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYWVidXp5aXd3a3phdXVia2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1MDU4MTUsImV4cCI6MjAzODA4MTgxNX0.dftzemhmWnq9Mp04YKJzQweiIz3hs3ZDwIaoTUjWS54";

export const supabase = createClient(supabaseUrl, supabaseKey);