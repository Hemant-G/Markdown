import React from "react";

function MenuBar({handleUpload,notes,selectedNoteId,selectedPageId,isManagerOn,setIsManagerOn, wordCount}) 
{
  return (
    <>
    <div className="my-0 bg-gradient-to-r from-violet-950 to-slate-950 to-30%  
    flex justify-between w-full h-full border-b border-slate-700">
      <div>
      <button
        onClick={() => {
          setIsManagerOn(!isManagerOn);
        }}
        title="Toggle Manager"
        className=" bg-transparent text-white  border-b rounded-none border-slate-300  hover:bg-slate-600 px-2 w-10 mx-1 h-full 
        transition ease-in-out delay-20 hover:scale-110"
      >
        {isManagerOn ? "🗁":"🗀"}
      </button>

        <button
          onClick={() => {
            handleUpload(selectedNoteId, selectedPageId, notes);
          }}
          title="Save"
          className=" bg-transparent text-white  border-b rounded-none border-slate-300 hover:bg-slate-600 px-2 w-10 mx-1 h-full
          transition ease-in-out delay-20 hover:scale-110"
        >
          🖫
        </button>

      </div>
      
        <div className="text-slate-300 mx-2">
        {wordCount} words
      </div>
      </div>
    </>
  );
}

export default MenuBar;
