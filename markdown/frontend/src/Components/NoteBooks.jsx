  import React, { useState } from "react";

  function NoteBooks({notes, setNotes, selectedNote, setSelectedNote}) {

    const onSelectNote = (id) => {
      const note = notes.find((note) => note._id === id )
      setSelectedNote(note)
    };

    const onAddNote = () => {
      const newTitle = prompt("Enter title for the new note:");
      if (newTitle) {
        const newNote = {
          title: newTitle,
          _id: Date.now(),

        };
        setNotes((prevNotes) => [...prevNotes, newNote]);
        setSelectedNote(newNote);
      }
    };

    return (
      <div className="w-[10%] bg-slate-900  p-4">
        <h3 className="font-bold mb-4 text-violet-200">Notebooks</h3>
        <button
          onClick={onAddNote}
          className="px-3 bg-gray-700 text-white rounded hover:bg-slate-500 transition"
        >
          Add Note
        </button>
        <ul>
          {notes.map((note) => (
            <li
              key={note._id}
              onClick={() => onSelectNote(note._id)}
              className="text-slate-400 my-2 cursor-pointer hover:text-white mb-2"
            >
              {note.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default NoteBooks;
