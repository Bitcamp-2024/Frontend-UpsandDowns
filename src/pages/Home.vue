<script setup>
import { authUserStore } from '../stores.js';
</script>

<template>
    <!-- <div :class="{ 'gradient-background': authUserStore().authenticated }"> -->
    <div>
        <div id="loggedIn" v-if="authUserStore().authenticated === true"> 
            <h1>Welcome, {{ authUserStore().profile.name }}</h1>
        </div>
        <div id="notloggedin">
            <h1>UPS & DOWNS: Your personal finance advisor</h1>
            <div id="split">
                <p class="para">Welcome to UPS & DOWNS: Your personal finance advisor, your AI companion dedicated to navigating the volatile seas of trading and personal finance. Whether you're a seasoned investor or just dipping your toes into the world of finance, UPS & DOWNS is here to provide insightful guidance and actionable advice tailored to your unique financial goals and risk tolerance. Through cutting-edge AI algorithms and real-time market analysis, UPS & DOWNS keeps a vigilant eye on market trends, economic indicators, and news events that could impact your investments. Our goal is simple: to empower you with the knowledge and tools you need to make informed decisions and stay ahead of the curve in an ever-changing financial landscape</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
p {
    margin: 30px;
}

#split {
    width: 50%;
    line-height: 200%;
    margin-left: 50px;
}

.para {
    font-weight: bold;
    color: white;
}

h1 {
  /* Apply gradient to text */
  background: linear-gradient(135deg, #7c3aed, #5d90e8);
  /* Set text color to transparent to show the gradient */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* Adjust font properties */
  font-size: 60px; /* Adjust the font size */
  font-weight: bold; /* Make the text bold */
  font-family: Arial, sans-serif; /* Specify font family */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add text shadow for definition */
  margin-left: 50px;

}
</style>