// utils/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig().public

if (!config.supabaseUrl || !config.supabaseKey) {
    throw new Error('Supabase URL and Key are required.')
}

export const supabase = createClient(config.supabaseUrl, config.supabaseKey)
