import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://goufbtdnghbtslqixbul.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdWZidGRuZ2hidHNscWl4YnVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MDUyOTgsImV4cCI6MjEwMzk4MTI5OH0.5Gyj1uRMZX2ULA-k-0Qd8dOUdBqMXbKGK0prgO53jX0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
