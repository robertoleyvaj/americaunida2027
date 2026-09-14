import { createClient } from "@supabase/supabase-js";

// Las llaves vienen de las variables de entorno (.env.local y .env.production).
// La "anon key" es pública por diseño; la seguridad la da la base de datos (RLS).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(url, anon);
