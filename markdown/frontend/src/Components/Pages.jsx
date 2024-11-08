import React , {useEffect} from "react";

function Pages({ notes, setNotes, selectedNote, setSelectedPageId, setSelectedNote}) {
  const onSelectPage = (id) => {
    const page = selectedNote.pages.find((page) => page._id === id);
    setSelectedPageId(page);
  };

  const onAddPage = (noteId) => {
    const newTitle = prompt("Enter title for the new page:");
    if (newTitle) {
      setNotes((prevNotes) => {                         
        const updatedNote = prevNotes.map((note) =>
          note._id === noteId
            ? {
                ...note,
                pages: [
                  ...(note.pages || []),
                  {
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
      const updatedSelectedNote = notes.find((note) => note._id === selectedNote._id);
      if (updatedSelectedNote) {
        setSelectedNote(updatedSelectedNote);
      }
    }
  }, [notes, selectedNote, setSelectedNote]);

  return (
    <div className="w-[10%] bg-slate-800 p-4">
      
      <h3 className="font-bold mb-4 font-bold mb-4 text-violet-200">Pages</h3>
      <button
        onClick={() => onAddPage(selectedNote._id)}
        className="px-3 bg-gray-700 text-white rounded  hover:bg-slate-500 transition"
      >
        Add Page
      </button>
      {selectedNote.pages?(<ul>
        {selectedNote.pages.map((page) => (
          <li
            key={page._id}
            className="text-slate-400 my-2 cursor-pointer hover:text-white mb-2"
            onClick={() => onSelectPage(page._id)}
          >
            {page.title}
          </li>
        ))}
      </ul>) : null}
      
    </div>
  );
}

export default Pages;
