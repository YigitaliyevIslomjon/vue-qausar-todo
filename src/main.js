// core
import { Quasar, Notify } from 'quasar'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './route'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
// style
import './assets/main.css'


const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(Quasar, {
    plugins: {
        Notify
    },
    config: { 
        notify: {
            position: 'top-right',
            timeout: 500,
            textColor: 'white',
            actions: [{ icon: 'close', color: 'white' }]
        }
    }
})

app.mount('#app')