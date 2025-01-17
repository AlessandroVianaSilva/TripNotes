import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''; // Certifique-se de que esta URL está correta
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; // Certifique-se de que esta chave está correta

export const supabase = createClient(supabaseUrl, supabaseKey);
