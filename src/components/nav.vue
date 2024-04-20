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

async function logOut() {
    let response = await fetch("/logout", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })

    let data = await response.json()
    //Error handling here or something idk
    
    if(data.message) {
        authUserStore().Login();
        router.push(data.redirect)
    }
}
</script>

<template>
    <div id="navbar">
        <div id="logo">
            <!-- <p class="header">Logo Here</p> -->
            <RouterLink to="/"><img src="../assets/logo.jpg"></RouterLink>
        </div>
        <div id="noneLogo">
            <RouterLink to="/" class="link">Home🏠</RouterLink>
            <RouterLink to="/about" class="link">About👤</RouterLink>
            <div id="buttonGroup" v-if="authUserStore().authenticated === false">
                <n-button class="button" color="#7c3aed" @click="goToSignUp">SIGN UP</n-button>
                <n-button class="button" color="#7c3aed" @click="goToLogin">LOG IN</n-button>
            </div>
            <div v-else id="username">
                <p id="usernameT">@{{ authUserStore().profile.username }}</p>
                <n-button class="button" color="#7c3aed" @click="logOut">LOG OUT</n-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#buttonGroup {
    display: inline;
}

#username {
    display: inline;
    margin-right: 30px;
}

#usernameT {
    font-weight: bold;
    display: inline;
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
#logo img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 20px;
    transition: .2s ease-in;
}
#logo img:hover {
    transform: scale(1.2);
}
</style>