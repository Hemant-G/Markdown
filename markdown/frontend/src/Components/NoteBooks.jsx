import React from "react";
import axios from "axios";

function NoteBooks({ notes, setNotes, selectedNoteId, setSelectedNoteId, setSelectedPageId }) {
  const onSelectNote = (id) => {
    setSelectedNoteId(id);
  };

  const sendPostRequest = async (newNote) => {
    try {
      const response = await axios.post("http://localhost:3000/markdown", newNote);
      return response.data; // This returns the newly created note from the server
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  };

  const onAddNote = () => {
    const newTitle = prompt("Enter title for the new note:");
    if (newTitle) {
      const newNote = {
        title: newTitle,
        pages: [{ title: "Page 1", content: "Write your notes here" },],
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);

      sendPostRequest(newNote)
        .then((response)=>{
          setSelectedNoteId((prev)=>response._id);
          console.log("Note created:", response._id);
          setSelectedPageId((prev)=>response.pages[0]._id);
          console.log("Page selected:", response.pages[0]._id);
        })
        .then(() => {
          window.location.reload(); 
        })
        .catch((err) => {
          console.log("Error creating note:", err);
        });

       // Select the new note immediately
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
            className="text-slate-400 my-2 cursor-pointer hover:text-white mb-2 "
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteBooks;
