<script setup lang="ts">

import { noteStore } from "../../stores/noteStore"

</script>

<template>
  <button type="button" title="add note" @click="noteStore.showModal = true">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  </button>

</template>

<style scoped>
button {
  background-color: var(--accent-color);
  border: none;
  border-radius: 100%;
  color: var(--bg-color);
  height: 3.3rem;
  width: 3.3rem;
  box-shadow: 0 5px 10px hsla(0, 0%, 0%, 0.4), 0 0px 15px hsla(0, 0%, 0%, 0.4);
  transition: scale 0.1s ease, filter 0.2s ease;
}

button:hover {
  filter: brightness(115%);
  animation: active-btn 0.2s ease forwards;
}

button:active {
  scale: 0.9;
}

button svg {
  width: 100%;
  height: 100%;
  color: inherit;
}

@keyframes active-btn {
  0% {
    transform: rotateZ(-20deg);
  }

  25% {
    transform: rotateZ(0deg);
  }

  50% {
    transform: rotateZ(20deg);
  }

  100% {
    transform: rotateZ(0deg);
  }
}

@media (prefers-color-scheme: light) {
  button {
    box-shadow: 0 5px 10px hsla(0, 0%, 0%, 0.2), 0 0px 10px hsla(0, 0%, 0%, 0.2);
  }
}
</style>