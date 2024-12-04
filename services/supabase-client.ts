import { SUPABASE } from '@/constants/environments';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(SUPABASE.PROJECT_URL, SUPABASE.API_KEY);
