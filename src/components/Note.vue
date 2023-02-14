<script setup lang="ts">

import { removeFromLocal } from "../utils/localStorage"
import { noteStore } from "../stores/noteStore";

type Note = {
  id: string;
  text: string;
  color: string;
  date: string;
};

const props = defineProps<{
  note: Note
}>();

const formatDate = () => {
  const date = props.note.date.split(",")[0];
  const time = props.note.date.split(",")[1];

  return [date, time];
}

const removeNote = () => {
  noteStore.notes = noteStore.notes.filter(note => note.id !== props.note.id);
  removeFromLocal(props.note);
}

const editNote = () => {
  noteStore.editing = true;
  noteStore.editingId = props.note.id;
  noteStore.noteInput = props.note.text;
  noteStore.showModal = true;
}

</script>


<template>
  <article :key="note.id" :style="{ backgroundColor: `${note.color}` }">
    <div class="btns">
      <button title="edit" class="edit-btn" @click="editNote">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-edit">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>
      <button title="delete" @click="removeNote" class="delete-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-trash-2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
    <p>{{ note.text }}</p>
    <div class="date-box">
      <span>{{ formatDate()[0] }}</span>
      <span>{{ `${formatDate()[1].split(":").slice(0, 2).join(":")} ${formatDate()[1].slice(-2)}`
      }}</span>
    </div>
  </article>
</template>


<style scoped>
article {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  color: var(--main-dark);
  border-radius: 0.5rem;
  height: 18rem;
  width: 15rem;
  box-shadow: 0 3px 15px hsla(0, 0%, 0%, 0.5), 0 0 15px hsla(0, 0%, 0%, 0.5);
  transition: filter 0.3s ease;
  transform-origin: center center;
}

article *::selection {
  background-color: #fff;
  color: var(--main-dark);
}

article::before {
  position: absolute;
  content: "";
  inset: 0;
  margin: auto;
  width: 80%;
  height: 60%;
  border-radius: 100%;
  background-color: transparent;
  transition: background-color 0.3s ease, filter 0.3s ease;
  z-index: -1;
}

article:hover {
  filter: brightness(105%);
}

article:hover .btns button {
  opacity: 1;
  visibility: visible;
  translate: 0 0%;
}

article:hover::before {
  background-color: inherit;
  filter: blur(7rem);
}

article p {
  word-wrap: break-word;
}

article .btns {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 0.3rem;
  overflow: hidden;
}

article .btns button {
  background: none;
  border: none;
  width: 1.4rem;
  height: 1.4rem;
  color: var(--main-dark);
  opacity: 0;
  visibility: hidden;
  translate: 0 -100%;
  transition: opacity 0.2s ease, translate 0.2s ease, visibility 0.2s ease, scale 0.1s ease;
  will-change: transform;
}

article .btns button:hover {
  animation: active-btn 0.2s ease forwards;
}

article .btns button:active {
  scale: 0.8;
}

article .btns button svg {
  width: 100%;
  height: 100%;
  color: inherit;
  stroke-width: 1px;
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

.date-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.date-box span {
  font-size: 0.8rem;
  opacity: 0.6;
  font-weight: 500;
}

@keyframes pop-in-item {
  0% {
    opacity: 0;
    scale: 0.7;
  }

  100% {
    opacity: 1;
    scale: 1;
  }
}

@media (prefers-color-scheme: light) {
  article {
    box-shadow: var(--shadow);
  }

  article::before {
    top: 0;
    left: -10%;
    width: 120%;
    height: 100%;
  }

  article:hover::before {
    background-color: inherit;
    filter: blur(5rem);
  }
}
</style>