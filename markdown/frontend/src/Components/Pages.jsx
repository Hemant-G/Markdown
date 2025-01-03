import axios from "axios";
import React, {useState} from "react";
import { sendPatchRequest } from "../App";
import { ControlledMenu, MenuItem } from '@szhsin/react-menu';

function Pages({
  notes,
  setNotes,
  selectedNoteId,
  selectedPageId,
  setSelectedNoteId,
  setSelectedPageId,
}) {
  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [rightClickedPageId, setRightClickedPageId] = useState("");
  const selectedNote = notes.find((note) => note._id == selectedNoteId);

  const onSelectPage = (id) => {
    if (selectedNote && selectedPageId) {
      sendPatchRequest(selectedNoteId, selectedPageId, notes);
    }

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
          const updatedPageId =
            updatedNote.pages[updatedNote.pages.length - 1]._id;
          return new Promise((resolve) =>
            resolve({ updatedNote, updatedPageId })
          );
          // Set the selected page ID to the last page
        })
        .then(({ updatedNote, updatedPageId }) => {
          setSelectedNoteId(updatedNote._id);
          setSelectedPageId(updatedPageId);
        })
        .then(() => window.location.reload())
        .catch((err) => {
          console.log("Error updating page:", err);
        });
    }
  };

  function renamePage(pageId){
    const newtitle = prompt("Enter new title for the page:");

    setNotes((prevNotes) => {
      return prevNotes.map((note) =>
        note._id == selectedNoteId
          ? {
              ...note,
              pages: note.pages.map((page) =>
                page._id == pageId ? { ...page, title: newtitle } : page
              ),
            }
          : note
      );
    });

    axios.patch(`http://localhost:3000/markdown/${selectedNoteId}/${pageId}/${newtitle}`)
    .then((res)=>{
      res.json(res.data);
      })
    .catch((err)=>{
      console.log("Error renaming page:", err);
    } )
  }
  
  function deletePage(pageId){
    setNotes((prevNotes) => {
      return prevNotes.map((note) =>
        note._id == selectedNoteId
          ? {
              ...note,
              pages: note.pages.filter((page) => page._id != pageId),
            }
          : note
      );
    });

    axios.delete(`http://localhost:3000/markdown/${selectedNoteId}/${pageId}`)
    .then((res)=>{
      res.json(res.data);
      })
    .catch((err)=>{
      console.log("Error deleting page:", err);
    })
    
  }

  return (
    <div className="h-full w-1/2 bg-slate-800 p-4">
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
              className={` ${
                selectedPageId == page._id
                  ? "text-fuchsia-300"
                  : "text-slate-400"
              } my-2 cursor-pointer hover:text-white mb-2 
                `}
              onClick={() => onSelectPage(page._id)}
              onContextMenu={(e) => {
                e.preventDefault();
                setAnchorPoint({ x: e.clientX, y: e.clientY });
                setRightClickedPageId(page._id);
                setOpen(true);
              }}
            >
              {page.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages yet</p>
      )}
      <ControlledMenu
        anchorPoint={anchorPoint}
        state={isOpen ? 'open' : 'closed'}
        direction="right"
        onClose={() => setOpen(false)}
      >
        <MenuItem onClick={()=>{setSelectedPageId(rightClickedPageId)}}>Open</MenuItem>
        <MenuItem onClick={()=>{renamePage(rightClickedPageId)}}>Rename</MenuItem>
        <MenuItem onClick={()=>{deletePage(rightClickedPageId)}}>Delete</MenuItem>

      </ControlledMenu>
    </div>
  );
}

export default Pages;
