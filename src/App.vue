<script setup lang="ts">
import Notes from './components/Notes.vue';
</script>

<template>
  <div class="wrapper">
    <Notes />
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 3rem;
}

@media (min-width: 1400px) {
  .wrapper {
    width: 85%;
  }
}
</style>
