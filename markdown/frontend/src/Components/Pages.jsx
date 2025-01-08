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
      return response.data;
    } catch (err) {
      console.log("Error:", err);
      throw err; 
    }
  };

  const onAddPage = (noteId) => {
    const newTitle = prompt("Enter title for the new page:");

    const new_page = {
      title: newTitle,
      content: "Write your notes here",
    };

    if (newTitle) {

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


      sendPutRequest(noteId, new_page)
        .then((updatedNote) => {
          const updatedPageId =
            updatedNote.pages[updatedNote.pages.length - 1]._id;
          return new Promise((resolve) =>
            resolve({ updatedNote, updatedPageId })
          );
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
    <div className="h-full w-1/2 bg-gradient-to-r from-indigo-950 to-slate-950 py-2 px-1 
    overflow-auto border-r border-slate-700  rounded-sm">
      <h4 className="font-bold mb-4 text-violet-200">📄Pages</h4>
      <button
        onClick={() => onAddPage(selectedNoteId)}
        className="px-3 bg-transparent border border-slate-400 text-slate-300 rounded-tr rounded-bl
        transition-all hover:border-slate-50 hover:bg-slate-300 hover:text-slate-950"
      >
       + Add Page
      </button>
      {selectedNote?.pages && selectedNote.pages.length > 0 ? (
        <ul>
          {selectedNote.pages.map((page) => (
            <li
              key={page._id}
              className={` ${
                selectedPageId == page._id
                  ? "text-fuchsia-300" : "text-slate-300"
              } my-2 cursor-pointer hover:text-white mb-2 overflow-visible break-words text-sm 
                `}
              onClick={() => onSelectPage(page._id)}
              onContextMenu={(e) => {
                e.preventDefault();
                setAnchorPoint({ x: e.clientX, y: e.clientY });
                setRightClickedPageId(page._id);
                setOpen(true);
              }}
            >
              { selectedPageId == page._id ? ">"+page.title: page.title}
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
        menuStyle={{ backgroundColor: '#C4BBF0', color: '#363B4E' }}
      >
        <MenuItem onClick={()=>{setSelectedPageId(rightClickedPageId)}}>Open</MenuItem>
        <MenuItem onClick={()=>{renamePage(rightClickedPageId)}}>Rename</MenuItem>
        <MenuItem onClick={()=>{deletePage(rightClickedPageId)}}>Delete</MenuItem>

      </ControlledMenu>
    </div>
  );
}

export default Pages;
