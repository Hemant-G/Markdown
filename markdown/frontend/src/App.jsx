import "./App.css";
import EditWindow from "./Components/EditWindow";
import NoteBooks from "./Components/NoteBooks";
import Pages from "./Components/Pages";

function App() {
  return (
    <>
      <div className="flex flex-row">
        <NoteBooks></NoteBooks>
        <Pages></Pages>
        <EditWindow></EditWindow>
      </div>
    </>
  );
}

export default App;
