// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.css'

// Google Fonts - Poppins
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

// Estilos personalizados
import './assets/styles/main.scss'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#4169e1',
          secondary: '#80b3ff',
          dark: '#1a1a2e',
          accent: '#1a1a2e',
          background: '#f8fafc'
        }
      }
    }
  }
})

createApp(App)
  .use(vuetify)
  .mount('#app')