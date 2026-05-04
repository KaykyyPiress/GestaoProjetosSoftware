import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, processLock } from '@supabase/supabase-js'

const supabaseUrl = 'https://oiuanoiwtmyfxtnimjoh.supabase.co'
const supabaseKey = 'sb_publishable_W0nxNm2uUzJVhLMxuEvArg_4JX2vc9c'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})