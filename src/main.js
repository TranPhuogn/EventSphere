import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initStore } from './stores/eventStore'

const app = createApp(App)
app.use(router)

// Hydrate the event store from the service layer, then mount
initStore().then(() => {
  app.mount('#app')
})
