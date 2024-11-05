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
    
      <div className="flex flex-row bg-[#282c34] w-screen h-screen">
        <div className="p-0 w-1/2 h-full ">
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
                height: '100%',
                width: '100%',
                padding:'0px',
                margin:'0px',
                overflowY: 'auto',
                resize:'none'
                }}
          />
        </div>
        <div className="w-0.5 bg-gray-300 m-0 h-full" />
        <div className="h-full bg-neutral-800 text-white px-1 w-1/2 overflow-y-auto">
          <Markdown >{data}</Markdown>
        </div>
      </div>
  
  );
}

export default EditWindow;
