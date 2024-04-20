import './assets/main.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import Cookies from 'js-cookie'
import naive from 'naive-ui'
import { createApp } from 'vue'
import App from './App.vue'

//Routing
import Home from "./pages/Home.vue"
import About from "./pages/About.vue"
import Stock from "./pages/Stock.vue"

const routes = [
    {path: "/", component: Home},
    {path: "/about", component: About},
    {path: "/stock/:id", component: Stock}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).use(naive).mount('#app')
