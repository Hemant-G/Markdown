import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import EditWindow from "./Components/EditWindow";
import NoteBooks from "./Components/NoteBooks";
import Pages from "./Components/Pages";
import MenuBar from "./Components/MenuBar";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);

  // Fetch notes when the app loads
  useEffect(() => {
    axios
      .get("http://localhost:3000/markdown")
      .then((res) => {
        setNotes(res.data);
        setSelectedNoteId(res.data[res.data.length-1]._id);  // Select the first note
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Ensure that a page is selected when a note is selected
  useEffect(() => {
    if (selectedNoteId && notes.length > 0) {
      const note = notes.find((note) => note._id == selectedNoteId);
      if (note && note.pages.length > 0 && !selectedPageId) {
        setSelectedPageId(note.pages[0]._id); // Set the first page if none is selected
      }
    }
  }, [selectedNoteId, notes]);

  // Update the page every 5 seconds (ensure changes are synced to DB)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const note = notes.find((note) => note._id == selectedNoteId);
      if (note) {
        const pageToUpdate = note.pages.find(
          (page) => page._id == selectedPageId
        );
        if (pageToUpdate) {
          axios
            .patch(
              `http://localhost:3000/markdown/${selectedNoteId}/${selectedPageId}`,
              {
                content: pageToUpdate.content,
                title: pageToUpdate.title,
              }
            )
            .then((res) => {
              console.log("Page updated:", res.data);
              console.log(selectedNoteId, selectedPageId);
            })
            .catch((err) => {
              console.log("Error updating page:", err);
            });
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [selectedNoteId, selectedPageId, notes]);


  return (
    <div className="bg-[#282c34]">
      <MenuBar />
      <div className="flex flex-row">
        <NoteBooks
          notes={notes}
          setNotes={setNotes}
          selectedNoteId={selectedNoteId}
          setSelectedNoteId={setSelectedNoteId}
          setSelectedPageId={setSelectedPageId}
        />
        <Pages
          notes={notes}
          setNotes={setNotes}
          selectedNoteId={selectedNoteId}
          setSelectedNoteId={setSelectedNoteId}
          setSelectedPageId={setSelectedPageId}
        />
        <EditWindow
          notes={notes}
          setNotes={setNotes}
          selectedNoteId={selectedNoteId}
          selectedPageId={selectedPageId}
        />
      </div>
    </div>
  );
}

export default App;
