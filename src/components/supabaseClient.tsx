import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY as string;


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getPublicUrl = async (fileName: string): Promise<string | null> => {
  try {
    const { data } = supabase.storage
      .from('imgs')
      .getPublicUrl(fileName);

    return data.publicUrl || null;
  } catch (error: any) {
    throw error;
  }
};
