import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

function EditWindow({selectedNote, notes, setNotes, selectedPageId}) {
  const [data, setdata] = useState("");

  const onContentChange = (newContent) => {
    setdata(newContent)
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        if (note.id === selectedNote.id) {
          const updatedPages = note.pages.map((page) =>
            page.id === selectedPageId.id
              ? { ...page, content: newContent } // Update the content of the page
              : page
          );
          return { ...note, pages: updatedPages };
        }
        return note;
      });
      return updatedNotes;
    });
  }

  useEffect(() => {
    if (selectedNote && selectedPageId && selectedNote.pages) {
      const page = selectedNote.pages.find((page) => page.id === selectedPageId.id);
      if (page) {
        setdata(page.content); // Set the content of the selected page to the editor
      }
    }
  }, [selectedNote, selectedPageId])

  return (
    <div className="flex flex-row bg-[#282c34] w-screen h-screen">
      <div className="p-0 w-1/2 h-full ">
        <Editor
          value={data}
          onValueChange={onContentChange}
          highlight={(code) => highlight(code, languages.js)}
          padding={20}
          placeholder={"WRITE YOUR CSS HERE"}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 15,
            backgroundColor: "#282c34",
            color: "#fff",
            height: "100%",
            width: "100%",
            padding: "0px",
            margin: "0px",
            overflowY: "auto",
            resize: "none",
          }}
        />
      </div>
      <div className="w-0.5 bg-gray-300 m-0 h-full" />
      <div className="h-full bg-neutral-800 text-white px-1 w-1/2 overflow-y-auto">
        <Markdown>{data}</Markdown>
      </div>
    </div>
  );
}

export default EditWindow;
