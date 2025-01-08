import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import EditWindow from "./Components/EditWindow";
import NoteBooks from "./Components/NoteBooks";
import Pages from "./Components/Pages";
import MenuBar from "./Components/MenuBar";
import { ToastContainer, toast } from "react-toastify";

const sendPatchRequest = (noteId, pageId, notes) => {
  const note = notes.find((note) => note._id == noteId);
  if (note) {
    const pageToUpdate = note.pages.find((page) => page._id == pageId);
    if (pageToUpdate) {
      axios
        .patch(`http://localhost:3000/markdown/${noteId}/${pageId}`, {
          content: pageToUpdate.content,
          title: pageToUpdate.title,
        })
        .then((res) => {
          console.log("Page updated:", res.data);
          console.log(noteId, pageId);
          return res.data;
        })
        .catch((err) => {
          console.log("Error updating page:", err);
        });
    }
  }
};

function handleUpload(noteId, pageId, notes) {
  sendPatchRequest(noteId, pageId, notes);
  if (pageId) {
    const notify = () =>
      toast("Page Saved!", {
        position: "bottom-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    notify();
  }
}

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [isManagerOn, setIsManagerOn] = useState(true);
  const [wordCount, setWordCount] = useState(0);

  // Fetch notes when the app loads
  useEffect(() => {
    axios
      .get("http://localhost:3000/markdown")
      .then((res) => {
        setNotes(res.data);
        setSelectedNoteId(res.data[res.data.length - 1]._id);
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
        setSelectedPageId(note.pages[note.pages.length - 1]._id);
      }
    }
  }, [selectedNoteId, notes]);

  // Update the page every 10 seconds 
  useEffect(() => {
    const intervalId = setInterval(() => {
      sendPatchRequest(selectedNoteId, selectedPageId, notes);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [selectedNoteId, selectedPageId, notes]);

  return (
    <div className="bg-blue-950 h-screen w-screen">
      <div className="h-1/20">
        <MenuBar
          handleUpload={handleUpload}
          notes={notes}
          selectedNoteId={selectedNoteId}
          selectedPageId={selectedPageId}
          isManagerOn={isManagerOn}
          setIsManagerOn={setIsManagerOn}
          wordCount={wordCount}
        />
      </div>

      <div className="flex flex-row h-19/20">
        {isManagerOn ? (
          <div className="w-1/5 h-full flex flex-row ">
            <NoteBooks
              notes={notes}
              setNotes={setNotes}
              selectedNoteId={selectedNoteId}
              setSelectedNoteId={setSelectedNoteId}
              setSelectedPageId={setSelectedPageId}
              isManagerOn={isManagerOn}
              setIsManagerOn={setIsManagerOn}
            />
            <Pages
              notes={notes}
              setNotes={setNotes}
              selectedNoteId={selectedNoteId}
              setSelectedNoteId={setSelectedNoteId}
              setSelectedPageId={setSelectedPageId}
              selectedPageId={selectedPageId}
            />
          </div>
        ) : null}

        <div className={`${isManagerOn ? "w-4/5" : "w-full"} h-full`}>
          <EditWindow
            notes={notes}
            setNotes={setNotes}
            selectedNoteId={selectedNoteId}
            selectedPageId={selectedPageId}
            setWordCount={setWordCount}
          />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
export { sendPatchRequest };
