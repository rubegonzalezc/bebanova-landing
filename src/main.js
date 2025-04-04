/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'

// Components
import App from './App.vue'

// Router
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        dark: true,
        colors: {
          primary: '#0B1D51',
          secondary: '#5E35B1',
          accent: '#4FC3F7',
          'accent-alt': '#FF4081',
          dark: '#010A26',
          light: '#E1E5F2',
        }
      },
    },
  },
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
