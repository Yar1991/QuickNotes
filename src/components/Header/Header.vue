<script setup lang="ts">

import { Teleport, ref } from "vue";

import AddNote from './AddNote.vue';
import NoteModal from './NoteModal.vue';


</script>

<template>
  <header>
    <h1 class="logo">QuickNotes</h1>
    <AddNote />
    <Teleport to="#app">
      <NoteModal />
    </Teleport>
  </header>
</template>

<style scoped>
header {
  padding-block-start: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: fade-in 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6) both;
}

.logo {
  font-family: var(--fancy-font);
  font-size: 3.3rem;
  color: var(--accent-color);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>