import { createClient } from '@supabase/supabase-js';

declare const global: any;

const supabase = global.supabase || createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export { supabase };