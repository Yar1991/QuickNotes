<script setup lang="ts">

import { ref, watch, onUnmounted } from "vue";
import { noteStore } from "../../stores/noteStore";
import { addToLocalNotes, updateLocalNotes } from "../../utils/localStorage";

type Note = {
  id: string;
  text: string;
  color: string;
  date: string;
};

const modalRef = ref<HTMLDialogElement | null>(null);


const openModalEvent = () => {

  noteStore.showModal = true;
  modalRef.value?.showModal();
  modalRef.value?.animate(
    [
      { opacity: 0, transform: "scale(1.3)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    {
      duration: 500,
      easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
      fill: "forwards",
    }
  );
};

const closeModalEvent = () => {
  if (noteStore.editing) {
    noteStore.editing = false;
  }
  noteStore.showModal = false;
  noteStore.noteInput = "";
  modalRef.value?.close();
}


const randomColor = (): string => {
  const randomHue = Math.floor(Math.random() * 360);
  return `hsl(${randomHue}, 80%, 80%)`;
}

const addNote = () => {
  if (!noteStore.noteInput) return;
  if (noteStore.editing) {
    //@ts-ignore
    noteStore.notes = noteStore.notes.flatMap((note: Note) => {
      return note.id === noteStore.editingId ? { ...note, text: noteStore.noteInput } : note;
    });
    updateLocalNotes(noteStore.notes);
    noteStore.noteInput = "";
    closeModal();
    return;
  }
  const note: Note = {
    id: crypto.randomUUID(),
    text: noteStore.noteInput,
    color: randomColor(),
    date: new Date().toLocaleString()
  }


  noteStore.notes = [...noteStore.notes, note];
  addToLocalNotes(note);
  noteStore.noteInput = "";
  closeModal();
}

const closeModal = () => {
  const closeModalAnim = modalRef.value?.animate([
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ], {
    duration: 300,
    easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
    fill: "forwards",
  })
  closeModalAnim?.addEventListener("finish", closeModalEvent);

  return () => closeModalAnim?.removeEventListener("finish", closeModalEvent);
}


const modalWatcher = watch(() => noteStore.showModal, () => {
  if (noteStore.showModal) {
    openModalEvent();
  }
});


onUnmounted(() => {
  modalWatcher();
})


</script>

<template>
  <dialog ref="modalRef">
    <div class="note-form">
      <textarea v-model.trim="noteStore.noteInput" maxlength="120" placeholder="e.g. my new note..."></textarea>
      <div class="btns">
        <button @click="addNote" class="add-btn" title="add note" type="button">{{
          noteStore.editing ? "Edit" : "Add"
        }}</button>
        <button @click="closeModal" type="button" class="close-btn" title="close modal">Close</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  position: fixed;
  inset: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
}

dialog::backdrop {
  background-color: hsla(0, 0%, 0%, 0.7);
}


.note-form {
  position: absolute;
  inset: 0;
  width: 25rem;
  height: fit-content;
  margin: auto;
  background-color: var(--secondary-dark);
  border-radius: 0.5rem;
  box-shadow: 0 3px 10px hsla(0, 0%, 0%, 0.5), 0 0 15px hsla(0, 0%, 0%, 0.3);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  gap: 1.5rem;
}

.note-form textarea {
  resize: none;
  min-height: 7rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: none;
  box-shadow: var(--shadow);
}

.btns {
  display: flex;
  align-items: center;
  align-self: center;
  gap: 2rem;
}

.btns button {
  position: relative;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  width: 6em;
  font-weight: 500;
  color: var(--main-light);
  box-shadow: var(--shadow);
  transition: filter 0.2s ease, scale 0.1s ease;
  overflow: hidden;
  transform-origin: center bottom;
}

.btns button::before {
  position: absolute;
  content: "";
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  filter: blur(30px) brightness(115%);
  translate: -120% 0%;
  transition: translate 0.3s ease;
}

.btns button:hover {
  filter: brightness(115%);
}

.btns button:hover::before {
  translate: 120% 0%;
}

.btns button:active {
  scale: 0.9;
}

.btns .add-btn {
  background-color: var(--accent-color);
}

.btns .close-btn {
  background-color: var(--warning-color);
}

@media (prefers-color-scheme: light) {
  .note-form {
    background-color: var(--main-light);
  }


  .btns .close-btn {
    background-color: hsl(0, 50%, 50%);
  }

}

@media (max-width: 500px) {
  .note-form {
    width: 100%;
  }
}
</style>