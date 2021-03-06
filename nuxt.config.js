export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "haram-nuxt",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/styleme.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/bootstrap-vue"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/google-fonts",
    "@nuxt/typescript-build"
  ],
  googleFonts: {
    /* module options */
    families: {
      Pangolin: [300, 500, 700],
      Niramit: true
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyDHi4Xzop-7s_BXgh4-HM_GkNT_6wSTSoU",
          authDomain: "haram-nuxt.firebaseapp.com",
          databaseURL: "https://haram-nuxt-default-rtdb.firebaseio.com",
          projectId: "haram-nuxt",
          storageBucket: "haram-nuxt.appspot.com",
          messagingSenderId: "1096824363111",
          appId: "1:1096824363111:web:7dbdae4a7c14bbcbe39cc2",
          measurementId: "G-E90NY0GNXZ"
        },
        services: {
          auth: {
            persistence: "local", // default
            initialize: {
              onAuthStateChangedMutation: "auth/ON_AUTH_STATE_CHANGED_MUTATION",
              onAuthStateChangedAction: "auth/onAuthStateChangedAction",
              subscribeManually: false
            },
            ssr: false // default
            // emulatorPort: 3000,
            // emulatorHost: "http://localhost"
          },
          storage: true
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  extends: ["@nuxtjs/eslint-config-typescript"]
  // typescript: {
  //   typeCheck: {
  //     eslint: {
  //       files: "./**/*.{ts,js,vue}"
  //     }
  //   }
  // }
  // transpileDependencies: ["vuex-module-decorators"]
};
