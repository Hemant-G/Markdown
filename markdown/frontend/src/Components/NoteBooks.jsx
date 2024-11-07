import React, { useState } from "react";

function NoteBooks({notes, setNotes, selectedNote, setSelectedNote}) {

  const onSelectNote = (id) => {
    const note = notes.find((note) => note.id === id )
    setSelectedNote(note)
  };

  const onAddNote = () => {
    const newTitle = prompt("Enter title for the new note:");
    if (newTitle) {
      const newNote = {
        id: Date.now(),
        title: newTitle,

      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setSelectedNote(newNote);
    }
  };

  return (
    <div className="w-[12%] border-r border-gray-300 p-4">
      <h2 className="font-bold mb-4">Notebooks</h2>
      <button
        onClick={onAddNote}
        className="mb-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Add Note
      </button>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => onSelectNote(note.id)}
            className="cursor-pointer hover:text-blue-500 mb-2"
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteBooks;
