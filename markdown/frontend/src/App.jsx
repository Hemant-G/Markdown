import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import EditWindow from "./Components/EditWindow";
import NoteBooks from "./Components/NoteBooks";
import Pages from "./Components/Pages";
import MenuBar from "./Components/MenuBar";


function App() {
  const [notes, setNotes] = useState([
    {
      pages: [{ }],
    },
  ]);

  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [selectedPageId, setSelectedPageId] = useState(notes[0].pages[0]._id);

  useEffect(() => {
    axios
      .get("http://localhost:3000/markdown")
      .then((res) => {
        setNotes(res.data);
        setSelectedNote(res.data[0]);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedNote.pages && selectedNote.pages.length > 0) {
      if (!selectedNote.pages.find((page) => page._id == selectedPageId)) {
        setSelectedPageId(selectedNote.pages[0]._id);
    }
  }
   }, [selectedNote]); 


   useEffect(() => {
    setSelectedNote(notes.find((note) => note._id == selectedNote._id));
   }, [notes]);

  const uploadNotes = () => {
    //Remove these laterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

    console.log(selectedNote.pages.find((page) => page._id == selectedPageId).content)
    console.log(selectedNote.pages.find((page) => page._id == selectedPageId).title)
    console.log(selectedNote._id)

    axios
      .patch(
        `http://localhost:3000/markdown/${selectedNote._id}/${selectedPageId}`,
        {content: selectedNote.pages.find((page) => page._id == selectedPageId).content,
          title: selectedNote.pages.find((page) => page._id == selectedPageId).title}
      )
      .then(console.log("Note uploaded"))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(uploadNotes, 5000);

    return () => clearInterval(intervalId);
  }, [selectedNote, selectedPageId]);

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

        <Pages
          notes={notes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          setSelectedPageId={setSelectedPageId}
          setNotes={setNotes}
        ></Pages>

        <EditWindow
          notes={notes}
          setNotes={setNotes}
          selectedNote={selectedNote}
          selectedPageId={selectedPageId}
        ></EditWindow>
      </div>
    </div>
  );
}

export default App;
