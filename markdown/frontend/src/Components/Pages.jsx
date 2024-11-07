import React , {useEffect} from "react";

function Pages({ notes, setNotes, selectedNote, setSelectedPageId, setSelectedNote}) {
  const onSelectPage = (id) => {
    const page = selectedNote.pages.find((page) => page.id === id);
    setSelectedPageId(page);
  };

  const onAddPage = (noteId) => {
    const newTitle = prompt("Enter title for the new page:");
    if (newTitle) {
      setNotes((prevNotes) => {                         
        const updatedNote = prevNotes.map((note) =>
          note.id === noteId
            ? {
                ...note,
                pages: [
                  ...(note.pages || []),
                  {
                    id: Date.now(),
                    title: newTitle,
                    content: "This is the content.",
                  },
                ],
              }
            : note
        );
        
        return updatedNote;
      });
      
    }
  };

  useEffect(() => {
    if (selectedNote) {
      const updatedSelectedNote = notes.find((note) => note.id === selectedNote.id);
      if (updatedSelectedNote) {
        setSelectedNote(updatedSelectedNote);
      }
    }
  }, [notes, selectedNote, setSelectedNote]);

  return (
    <div className="w-[20%] border-r border-gray-300 p-4">
      <button
        onClick={() => onAddPage(selectedNote.id)}
        className="mb-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Add Page
      </button>
      <h2 className="font-bold mb-4">Pages</h2>
      {selectedNote.pages?(<ul>
        {selectedNote.pages.map((page) => (
          <li
            key={page.id}
            className="cursor-pointer p-2 hover:bg-gray-200"
            onClick={() => onSelectPage(page.id)}
          >
            {page.title}
          </li>
        ))}
      </ul>) : null}
      
    </div>
  );
}

export default Pages;
