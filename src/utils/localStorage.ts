type Note = {
  id: string;
  text: string;
  date: string;
};

export const addToLocalNotes = (note: Note) => {
  if (!localStorage.getItem("notes")) {
    localStorage.setItem("notes", JSON.stringify([note]));
  } else {
    const notes = JSON.parse(localStorage.getItem("notes")!);
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
};

export const updateLocalNotes = (notes: Note[]) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const getFromLocal = () => {
  if (localStorage.getItem("notes")) {
    const notes = JSON.parse(localStorage.getItem("notes")!);
    return notes;
  } else {
    return [];
  }
};

export const removeFromLocal = (note: Note) => {
  if (localStorage.getItem("notes")) {
    const notes = JSON.parse(localStorage.getItem("notes")!);
    localStorage.setItem(
      "notes",
      JSON.stringify([...notes.filter((n: Note) => n.id !== note.id)])
    );
  }
};
