import React, {useState} from 'react'

function NoteBooks() {
    const [notes, setNotes] = useState([
        { id: 1, title: 'Note 1', content: 'This is the content of note 1' },
        { id: 2, title: 'Note 2', content: 'This is the content of note 2' },
      ]);
  return (


      <div className="w-[12%] border-r border-gray-300 p-4">
        <h2 className="font-bold mb-4">Notebooks</h2>
        <ul>
          {notes.map(note => (
            <li
              key={note.id}
                                                                                
            >
              {note.title}
            </li>
          ))}
        </ul>
      </div>
  
  )
}

export default NoteBooks
