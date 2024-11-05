import React, { useState } from "react";
import Markdown from "react-markdown";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

function EditWindow() {
  const [data, setdata] = useState("");

  return (
    <>
      <div className="flex flex-row bg-neutral-800 w-full">
        <div className="p-0">
          <Editor
            value={data}
            onValueChange={(value) => setdata(value)}
            highlight={(code) => highlight(code, languages.js)}
            padding={20}
            placeholder={"WRITE YOUR CSS HERE"}
            style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 15,
                backgroundColor: '#282c34',
                color: '#fff',
                height: '100vh',
                width: '50vw',
                overflow: 'auto',
                padding:'0px',
                margin:'0px'
                }}
          />
        </div>
        <div className="w-0.5 bg-gray-300" />
        <div className="h-screen bg-neutral-800 text-white mx-5 w-full">
          <Markdown>{data}</Markdown>
        </div>
      </div>
    </>
  );
}

export default EditWindow;
