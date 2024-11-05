import './App.css'
import EditWindow from './Components/EditWindow'
import NoteBooks from './Components/NoteBooks'


function App() {

  return (
    <><div className='flex flex-row'>
      <NoteBooks></NoteBooks>
      <EditWindow></EditWindow>
      </div>
    </>
  )
}

export default App
