// https://nuxt.com/docs/api/configuration/nuxt-config

const MovieAppTheme ={
  dark : true,
  colors:{
    background:"#020617"
  }
}
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "vuetify-nuxt-module",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt"
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme:{
        defaultTheme:"MovieAppTheme",
        themes:{
          MovieAppTheme,
        }
      },
     icons: {
        defaultSet: 'mdi',
        sets:['mdi','fa']
      }
    },
  },
});