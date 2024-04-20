<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

let username = ref("")
let password = ref("")
let text = ref("")

let router = useRouter()

async function login() {
  let response = await fetch("/login", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ username: username.value, password: password.value })
  })

  let data = await response.json()

  if(data.errorCode) {
    text.value = data.error;
  }

  if(data.success) {
    router.push(data.redirect)
  }
}
</script>

<template>
  <div class="login-container">
    <h2 class="login-title">LOG IN</h2>
    <div class="login-box">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username" class="input-label">Username</label>
          <input type="text" class="form-control" id="username" v-model="username" required autocomplete="off">
        </div>
        <div class="form-group">
          <label for="password" class="input-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required autocomplete="off">
        </div>
        <button type="submit" class="btn btn-primary" id="login-btn" @click="login">LOG IN!</button>
        <p id="error">{{ text }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
input {
    border-radius: 2px;
}
input:focus {
    outline: 0;
    border-color: #5e1ecb;
    border-width: 3px;
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-title {
  font-size: 48px; /* Increased font size */
  margin-bottom: 20px;
  color: #7c3aed; /* Purple text color */
  text-transform: uppercase; /* Uppercase text */
  font-weight: bold; /* Bold text */
}

.login-box {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.input-label {
  color: black;
}

.form-control {
  margin-top: 10px;
  border: 2px solid #7c3aed; /* Purple border */
  border-radius: 5px; /* Rounded corners */
  padding: 10px; /* Add padding */
}

.form-control {
    outline-color: green;
}

.btn-primary {
  background-color: #7c3aed;
  color: white;
  padding: 10px 0;
  width: calc(100% - 80px); /* Subtracting padding */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: center; /* Centering the button */
}

.btn-primary:hover {
  background-color: #6b2fbb;
}

#login-btn {
    width: 100%;
}

#error {
    color: red;
    font-weight: bold;
}
</style>
