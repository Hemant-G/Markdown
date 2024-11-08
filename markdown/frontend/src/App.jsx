import { useState, useEffect } from "react";
import axios from "axios"
import "./App.css";
import EditWindow from "./Components/EditWindow";
import NoteBooks from "./Components/NoteBooks";
import Pages from "./Components/Pages";
import MenuBar from "./Components/MenuBar";


function App() {
  const [notes, setNotes] = useState([
    { title: "Something", 
      pages: [
        {title: "Page1", content: "this is content",},
    ] },
  ]);



  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [selectedPageId, setSelectedPageId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/')
  .then(res => {
    setNotes(res.data)
  })
  .catch(err => {console.log(err)})
  },);
  
  useEffect(() => {
    setSelectedNote(notes[0])
    setSelectedPageId(notes[0].pages[0])
  },[notes]);
  

  
  return (
    <div className="bg-[#282c34]">
      <MenuBar></MenuBar>
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
    </div>
  );
}

export default App;
