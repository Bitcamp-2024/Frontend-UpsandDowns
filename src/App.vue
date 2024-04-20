<script setup>
import Nav from "./components/nav.vue"
</script>

<template>
  <Nav></Nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }


  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
