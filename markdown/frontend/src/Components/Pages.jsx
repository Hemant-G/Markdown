import axios from "axios";
import React, { useEffect } from "react";

function Pages({
  notes,
  setNotes,
  selectedNoteId,
  setSelectedNoteId,
  setSelectedPageId,
}) {
  const selectedNote = notes.find((note) => note._id == selectedNoteId);

  const onSelectPage = (id) => {
    const page = selectedNote.pages.find((page) => page._id == id);
    setSelectedPageId(page._id);
  };

  const sendPutRequest = async (noteId, new_page) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/markdown/${noteId}`,
        new_page
      );
      return response.data; // This returns the updated note from the server
    } catch (err) {
      console.log("Error:", err);
      throw err; // Propagate the error to be handled later
    }
  };

  const onAddPage = (noteId) => {
    const newTitle = prompt("Enter title for the new page:");

    const new_page = {
      title: newTitle,
      content: "Write your notes here",
    };

    if (newTitle) {
      // Optimistically update the state first
      setNotes((prevNotes) => {
        return prevNotes.map((note) =>
          note._id == noteId
            ? {
                ...note,
                pages: [...(note.pages || []), new_page],
              }
            : note
        );
      });

      // Send PUT request to server after optimistically updating the local state
      sendPutRequest(noteId, new_page)
        .then((updatedNote) => {
          const updatedPageId = updatedNote.pages[updatedNote.pages.length - 1]._id;
          return new Promise((resolve) => resolve({ updatedNote, updatedPageId }));
           // Set the selected page ID to the last page
        })
        .then(({ updatedNote, updatedPageId }) => { 
          setSelectedNoteId(updatedNote._id);
          setSelectedPageId(updatedPageId);
        })
        .then(()=>window.location.reload())
        .catch((err) => {
          console.log("Error updating page:", err);
        });
    }
  };

  return (
    <div className="w-[10%] bg-slate-800 p-4">
      <h3 className="font-bold mb-4 text-violet-200">Pages</h3>
      <button
        onClick={() => onAddPage(selectedNoteId)}
        className="px-3 bg-gray-700 text-white rounded hover:bg-slate-500 transition"
      >
        Add Page
      </button>
      {selectedNote?.pages && selectedNote.pages.length > 0 ? (
        <ul>
          {selectedNote.pages.map((page) => (
            <li
              key={page._id}
              className="text-slate-400 my-2 cursor-pointer hover:text-white mb-2"
              onClick={() => onSelectPage(page._id)}
            >
              {page.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages yet</p>
      )}
    </div>
  );
}

export default Pages;
