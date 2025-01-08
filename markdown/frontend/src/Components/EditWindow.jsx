import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor/nohighlight";
import wcount from "word-count";


function EditWindow({
  notes,
  setNotes,
  selectedNoteId,
  selectedPageId,
  setWordCount,
}) {
  const selectedNote = notes.find((note) => note._id == selectedNoteId);
  const [data, setData] = useState("");
  setWordCount(wcount(data));

  const onContentChange = (newContent) => {
    setData(newContent);
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        if (note._id == selectedNoteId) {
          const updatedPages = note.pages.map((page) =>
            page._id == selectedPageId ? { ...page, content: newContent } : page
          );
          return { ...note, pages: updatedPages };
        }
        return note;
      });
      return updatedNotes;
    });
  };

  useEffect(() => {
    if (selectedNote && selectedPageId) {
      const page = selectedNote.pages.find(
        (page) => page._id == selectedPageId
      );
      if (page) {
        setData(page.content);
      }
    }
  }, [selectedNote, selectedPageId]);

  return (
    <div className=" flex flex-row bg-slate-900 w-full h-full">
      <div className=" w-2/5 h-full">
        <MDEditor
          height="100%"
          value={data}
          onChange={onContentChange}
          preview="edit"
          hideToolbar={true}
        />
      </div>
      <div className="flex-shrink-0 h-full bg-slate-900 text-white w-3/5 overflow-y-auto  ">
        <MDEditor
          value={data}
          height="100%"
          preview="preview"
          hideToolbar={true}
        />
      </div>
    </div>
  );
}

export default EditWindow;
