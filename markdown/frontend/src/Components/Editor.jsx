import React, { useState } from "react";
import Markdown from "react-markdown";

function Editor() {
  const [data, setdata] = useState();

  return (
    <>
      <div className="flex flex-row w-full ">
        <div className="h-screen bg-green-400 w-1/2">
          <form onSubmit={(e) => e.preventDefault()}>
            <textarea className="w-full" 
            rows={30}
              type="text"
              onChange={(e) => {
                setdata(e.target.value);
              }}
            />
          </form>
        </div>

        <div className="h-screen bg-sky-300 w-1/2">
          <Markdown>{data}</Markdown>
        </div>
      </div>
    </>
  );
}

export default Editor;
