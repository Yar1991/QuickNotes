<script setup lang="ts">
import Header from './Header/Header.vue';
import Note from './Note.vue';
import { noteStore } from "../stores/noteStore"

</script>


<template>
  <Header />
  <section class="notes">
    <TransitionGroup name="grid">
      <Note v-for="note in noteStore.notes" :note="note" :key="note.id" />
    </TransitionGroup>
  </section>
</template>

<style scoped>
.notes {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 2.5rem 1rem;
  place-items: center;
  animation: fade-in 0.7s cubic-bezier(0.68, -0.6, 0.32, 1.6) both;
  animation-delay: 0.3s;
}

.grid-move,
.grid-enter-active {
  transition: all 0.7s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.grid-leave-active {
  transition: all 0.2s ease-in;
}

.grid-leave-from,
.grid-enter-to {
  opacity: 1;
  scale: 1;
}

.grid-leave-to,
.grid-enter-from {
  opacity: 0;
  scale: 0.7;
}

.grid-leave-active {
  position: absolute;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1
  }
}
</style>