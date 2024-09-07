import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://amyromamxjdfgqmqvdeb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteXJvbWFteGpkZmdxbXF2ZGViIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzMzMDM3NiwiZXhwIjoyMDM4OTA2Mzc2fQ.ujk8p9R3YaPJW2K4PgxpMG5cFwk_-0ZsDzEtz8b9Pcw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getPublicUrl = async (fileName: string): Promise<string | null> => {
  try {
    const { data } = supabase.storage
      .from('imgs')
      .getPublicUrl(fileName);

    console.log(data.publicUrl);
    return data.publicUrl || null;
  } catch (error: any) {
    console.error('Error getting public URL:', error.message);
    throw error;
  }
};
