import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;
const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET as string | undefined;

export function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}

export function getBucket() {
  return supabaseBucket ?? null;
}

export function getPublicUrlForPath(path: string): string | null {
  const sb = getSupabase();
  const bucket = getBucket();
  if (!sb || !bucket) return null;
  const { data } = sb.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl ?? null;
}
