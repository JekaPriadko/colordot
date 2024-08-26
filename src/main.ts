import './assets/main.scss'
import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          teal: colors.teal.base
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

// Pinia
import { createPinia } from 'pinia'

// Router
import router from './router'

// App
import App from './App.vue'

// Init
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(vuetify).mount('#app')
