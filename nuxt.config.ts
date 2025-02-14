// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  supabase: {
    redirect: false,
  },

})
