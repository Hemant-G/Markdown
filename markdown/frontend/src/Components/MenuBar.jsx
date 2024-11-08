import React from 'react'

function MenuBar({handleUpload}) {
  return (
    <div className='my-0 bg-neutral-700 flex flex-row-reverse'>
      <button className='px-3 bg-gray-700 text-white rounded hover:bg-slate-500 transition my-1 mb-0 '>Upload</button>
    </div>
  )
}

export default MenuBar
