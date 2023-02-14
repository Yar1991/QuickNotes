import { reactive, ref } from "vue";
import { getFromLocal } from "../utils/localStorage";

type Note = {
  id: string;
  text: string;
  color: string;
  date: string;
};

interface NoteStoreInterface {
  notes: Array<Note>;
  editing: boolean;
  editingId: string;
  noteInput: string;
  showModal: boolean;
}

export const noteStore = reactive<NoteStoreInterface>({
  notes: getFromLocal(),
  editing: false,
  editingId: "",
  noteInput: "",
  showModal: false,
});
