// Supabase client placeholder. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel after creating the project.
// The package dependency is intentionally not added until the Supabase project is created.
export const supabaseConfig={url:import.meta.env.VITE_SUPABASE_URL||'',anonKey:import.meta.env.VITE_SUPABASE_ANON_KEY||''};
export const isSupabaseConfigured=Boolean(supabaseConfig.url&&supabaseConfig.anonKey);
