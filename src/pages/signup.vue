<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

let name = ref("")
let username = ref("")
let password = ref("")
let text = ref("")

let router = useRouter()

async function signup() {
  let response = await fetch("/signup", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({name: name.value, username: username.value, password: password.value})
  })

  let data = await response.json()

  if(data.errorCode) {
    text.value = data.error;
  }

  if(data.success) {
    text.value = 'success!';
    router.push(data.redirect)
  }
}
</script>

<template>
  <div class="signup-container">
    <h2 class="signup-title">SIGN UP</h2>
    <div class="signup-box">
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="name" class="input-label">Name</label>
          <input type="text" class="form-control" id="name" v-model="name" required autocomplete="off">
        </div>
        <div class="form-group">
          <label for="username" class="input-label">Username</label>
          <input type="text" class="form-control" id="username" v-model="username" required autocomplete="off">
        </div>
        <div class="form-group">
          <label for="password" class="input-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required autocomplete="off">
        </div>
        <button type="submit" class="btn btn-primary" id="signup-btn">SIGN UP!</button>
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
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.signup-title {
  font-size: 48px; /* Increased font size */
  margin-bottom: 20px;
  color: #7c3aed; /* Purple text color */
  text-transform: uppercase; /* Uppercase text */
  font-weight: bold; /* Bold text */
}

.signup-box {
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

#signup-btn {
    width: 100%;
}

#error {
    color: red;
    font-weight: bold;
}
</style>
