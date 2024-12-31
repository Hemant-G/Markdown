import React from "react";

function NoteBooks({ notes, setNotes, selectedNoteId, setSelectedNoteId }) {
  const onSelectNote = (id) => {
    setSelectedNoteId(id);
  };

  const onAddNote = () => {
    const newTitle = prompt("Enter title for the new note:");
    if (newTitle) {
      const newNote = {
        title: newTitle,
        _id: Date.now(),
        pages: []
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setSelectedNoteId(newNote._id); // Select the new note immediately
    }
  };

  return (
    <div className="w-[10%] bg-slate-900 p-4">
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
