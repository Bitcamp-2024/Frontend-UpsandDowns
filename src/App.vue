<script setup>
import Nav from "./components/nav.vue"
import Footer from "./components/footer.vue"

import { authUserStore } from "./stores";
authUserStore().Login();
</script>

<template>
  <div id="app">
    <Nav></Nav>
    <main>
      <RouterView v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component"></component>
        </transition>
      </RouterView>
    </main>
    <Footer></Footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}

footer {
  flex-shrink: 0;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

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
