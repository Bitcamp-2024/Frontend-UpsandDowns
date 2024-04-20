<script setup>
import { authUserStore } from '../stores.js';
</script>

<template>
    <!-- <div :class="{ 'gradient-background': authUserStore().authenticated }"> -->
    <div>
        <h1 v-if="authUserStore().authenticated === true">Welcome, {{ authUserStore().profile.name }}</h1>
        <p>This is the home page</p>
    </div>
</template>

<style scoped>
p {
    margin: 30px;
}
h1 {
  /* Apply gradient to text */
  background: linear-gradient(135deg, #41B883, #5d90e8);
  /* Set text color to transparent to show the gradient */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* Adjust font properties */
  font-size: 64px; /* Adjust the font size */
  font-weight: bold; /* Make the text bold */
  font-family: Arial, sans-serif; /* Specify font family */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add text shadow for definition */
  margin-left: 24px;
}
</style>