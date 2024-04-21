import './assets/main.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import Cookies from 'js-cookie'
import naive from 'naive-ui'
import { createApp } from 'vue'
import { createPinia } from "pinia"
import { authUserStore } from './stores'
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";

//State Management
let pinia = createPinia()


//Routing
import Home from "./pages/Home.vue"
import About from "./pages/About.vue"
import Stock from "./pages/Stock.vue"
import Signup from "./pages/signup.vue"
import Login from "./pages/login.vue"

const routes = [
    {path: "/", component: Home},
    {path: "/about", component: About},
    {path: "/stock", component: Stock},
    {path: "/signup", component: Signup},
    {path: "/login", component: Login},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).use(naive).use(pinia).use(VueApexCharts).mount('#app')
