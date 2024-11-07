import { useState } from "react";
import "./App.css";
import EditWindow from "./Components/EditWindow";
import NoteBooks from "./Components/NoteBooks";
import Pages from "./Components/Pages";

function App() {
  const [notes, setNotes] = useState([
    { id: "alpha", title: "Something", 
      pages: [
        {id:"pageid1", title: "Page1", content: "this is content",},
    ] },
  ]);

  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [selectedPageId, setSelectedPageId] = useState(null);

  return (
    <>
      <div className="flex flex-row">
        <NoteBooks
          notes={notes}
          setNotes={setNotes}
          setSelectedNote={setSelectedNote}
          selectedNote={selectedNote}
        ></NoteBooks>

        <Pages notes={notes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} setSelectedPageId={setSelectedPageId} setNotes={setNotes}></Pages>

        <EditWindow notes={notes} setNotes={setNotes} selectedNote={selectedNote} selectedPageId={selectedPageId} ></EditWindow>
      </div>
    </>
  );
}

export default App;
