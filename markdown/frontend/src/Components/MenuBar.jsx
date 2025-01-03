import React from "react";

function MenuBar({handleUpload,notes,selectedNoteId,selectedPageId,isManagerOn,setIsManagerOn,}) 
{
  return (
    <>
    <div className="my-0 bg-neutral-700 flex justify-between ">

      <button
        onClick={() => {
          setIsManagerOn(!isManagerOn);
        }}
        className="px-3 bg-gray-700 text-white rounded hover:bg-slate-500 transition my-1 mb-0"
      >
        Toggle
      </button>

        <button
          onClick={() => {
            handleUpload(selectedNoteId, selectedPageId, notes);
          }}
          className="px-3 bg-gray-700 text-white rounded hover:bg-slate-500 transition my-1 mb-0 "
        >
          Upload
        </button>
      </div>
    </>
  );
}

export default MenuBar;
