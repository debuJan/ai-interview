// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jorxylcuhzhmtrrsnqef.supabase.co'; // ✅ correct project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvcnh5bGN1aHpobXRycnNucWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODYyNTgsImV4cCI6MjA2NTY2MjI1OH0.1bxVCL1Es8lIuW5beykmb_GZ_UU5uANC529aGH5xWRw';

export const supabase = createClient(supabaseUrl, supabaseKey);
