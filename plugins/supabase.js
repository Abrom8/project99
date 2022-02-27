import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
    process.env.NUXT_ENV_SUPABASE_URL,
    process.env.NUXT_ENV_SUPABASE_ANON_KEY
  )
  export default (_, inject) => {
    inject('supabase', supabase)
  }
