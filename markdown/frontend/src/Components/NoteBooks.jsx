import React, {useState} from "react";
import axios from "axios";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

function NoteBooks({
  notes,
  setNotes,
  selectedNoteId,
  setSelectedNoteId,
  setSelectedPageId,
}) {
  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [RightClickedNoteId, setRightClickedNoteId] = useState("");

  const onSelectNote = (id) => {
    setSelectedNoteId(id);
  };

  const sendPostRequest = async (newNote) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/markdown",
        newNote
      );
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
        pages: [{ title: "Page 1", content: "Write your notes here" }],
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);

      sendPostRequest(newNote)
        .then((response) => {
          setSelectedNoteId((prev) => response._id);
          console.log("Note created:", response._id);
          setSelectedPageId((prev) => response.pages[0]._id);
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

  function renameNote(noteId){
    const newtitle = prompt("Enter new title for the note:");
    setNotes((prevNotes) => {
      return prevNotes.map((note) =>
        note._id == noteId
          ? {
              ...note,
              title: newtitle,
            }
          : note
      );
    });

    axios.patch(`http://localhost:3000/markdown/${noteId}`,
    {title: newtitle}
    )
    .then((res)=>{
      res.json(res.data);
    })
    .catch((err)=>{
      console.log("Error renaming note:", err);
    })
  }
  
  function deleteNote(noteId){
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note._id != noteId);
    });

    axios.delete(`http://localhost:3000/markdown/${noteId}`)
    .then((res)=>{
      res.json(res.data);
      })
    .catch((err)=>{
      console.log("Error deleting note:", err);
    })
    
  }


  return (
    <div className="h-full w-1/2 bg-slate-900 p-4">
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
            onContextMenu={(e) => {
              e.preventDefault();
              setAnchorPoint({ x: e.clientX, y: e.clientY });
              setRightClickedNoteId(note._id);
              setOpen(true);
            }}
            className={`${
              selectedNoteId == note._id ? "text-fuchsia-300" : "text-slate-400"
            }  my-2 cursor-pointer hover:text-white mb-2
            `}
          >
            {note.title}
          </li>
        ))}
      </ul>
      <ControlledMenu
              anchorPoint={anchorPoint}
              state={isOpen ? 'open' : 'closed'}
              direction="right"
              onClose={() => setOpen(false)}
            >
              <MenuItem onClick={()=>{setSelectedNoteId(RightClickedNoteId)}}>Open</MenuItem>
              <MenuItem onClick={()=>{renameNote(RightClickedNoteId)}}>Rename</MenuItem>
              <MenuItem onClick={()=>{deleteNote(RightClickedNoteId)}}>Delete</MenuItem>
      </ControlledMenu>
    </div>
  );
}

export default NoteBooks;
