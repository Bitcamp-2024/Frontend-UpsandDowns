<script setup>
import { RouterLink, useRouter} from "vue-router"
import { authUserStore } from '../stores.js';

let router = useRouter();

function goToSignUp() {
    console.log("EGEG")
    router.push("/signup")
}

function goToLogin() {
    console.log("EGege")
    router.push("/login")
}


</script>

<template>
    <div id="navbar">
        <div id="logo">
            <p class="header">Logo Here</p>
        </div>
        <div id="noneLogo">
            <RouterLink to="/" class="link">/</RouterLink>
            <RouterLink to="/about" class="link">About</RouterLink>
            <div v-if="authUserStore().authenticated === true">
                <n-button class="button" color="#7c3aed" @click="goToSignUp">SIGN UP</n-button>
                <n-button class="button" color="#7c3aed" @click="goToLogin">LOG IN</n-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    font-size: 40px;
}

#logo {
    margin-left: 30px;
}

.button {
    margin-right: 30px;
    margin-left: 30px;
}

.link {
    margin: 30px;
    font-size: 20px;
    font-weight:  bold;
}

#noneLogo {
    margin-top: 20px;
}

#navbar {
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 40px;
}
</style>