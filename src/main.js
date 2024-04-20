import './assets/main.css'
import { createRouter, createWebHashHistory } from 'vue-router'

import { createApp } from 'vue'
import App from './App.vue'

//Routing
import Home from "./pages/Home.vue"
import About from "./pages/About.vue"
let routes = [
    {path: "/", component: Home},
    {path: "/about", component: About},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
