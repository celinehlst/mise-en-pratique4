import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

const app = createApp(App)

app.use(router)
app.use(VueCookies)

const userToken = ref('')
const updateUserToken = (value) => {
  userToken.value = value
  alert('Changement effecuté')
}

app.provide('Store', { userToken: userToken, updateUserToken: updateUserToken })

app.mount('#app')
