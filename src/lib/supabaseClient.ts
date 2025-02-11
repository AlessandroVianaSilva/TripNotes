// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('supabaseUrl e/ou supabaseKey não estão definidos.');
// }

// const supabase = createClient(supabaseUrl, supabaseKey);

// // Função que retorna a instância do Supabase
// export const getSupabaseClient = () => supabase;

// import { createClient, SupabaseClient } from '@supabase/supabase-js';

// // Variáveis de ambiente do Supabase
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// // Verifique se as variáveis estão definidas corretamente
// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('supabaseUrl e/ou supabaseKey não estão definidos.');
// }

// // Instância do Supabase que será criada apenas uma vez (Singleton)
// let supabase: SupabaseClient;

// export const getSupabaseClient = (): SupabaseClient => {
//   if (!supabase) {
//     supabase = createClient(supabaseUrl, supabaseKey);
//   }
//   return supabase;
// };

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
