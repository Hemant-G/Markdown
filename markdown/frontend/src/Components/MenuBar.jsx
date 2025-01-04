import React from "react";
import { toast } from 'react-toastify';

function MenuBar({handleUpload,notes,selectedNoteId,selectedPageId,isManagerOn,setIsManagerOn, wordCount}) 
{
  return (
    <>
    <div className="my-0 bg-slate-900 flex justify-between w-full h-full ">
      <div>
      <button
        onClick={() => {
          setIsManagerOn(!isManagerOn);
        }}
        title="Toggle Manager"
        className=" bg-slate-900 text-white  border-b rounded-none border-slate-300  hover:bg-slate-600 px-2 w-10 mx-1 h-full 
        transition ease-in-out delay-20 hover:scale-110"
      >
        {isManagerOn ? "🗁":"🗀"}
      </button>

        <button
          onClick={() => {
            handleUpload(selectedNoteId, selectedPageId, notes);
          }}
          title="Save"
          className=" bg-slate-900 text-white  border-b rounded-none border-slate-300 hover:bg-slate-600 px-2 w-10 mx-1 h-full
          transition ease-in-out delay-20 hover:scale-110"
        >
          🖫
        </button>

      </div>
      
        <div className="text-white mx-2">
        {wordCount} words
      </div>
      </div>
    </>
  );
}

export default MenuBar;
