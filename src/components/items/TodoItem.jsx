import { useState } from 'react';

function TodoItem({ text, nameProject, completed, onComplete, onDelete }) {
  const [ srcImage, setSrcImage ] = useState('/circle.svg');
  const [ textDecoration, setTextDecoration ] = useState('no-underline');

  const handleButtonClick = () => {
    if(!completed){
      setSrcImage('/check-circle.svg');
      setTextDecoration('line-through');
    } else {
      setSrcImage('/circle.svg');
      setTextDecoration('no-underline');
    }
    onComplete();
  }

  return (
    <div className="bg-secondary-light max-w-lg p-3 mt-2 w-11/12 rounded-3xl flex gap-3 items-center justify-between shadow-md">
      <div className='flex gap-3'>
        <button className="bg-unset cursor-pointer" onClick={handleButtonClick}>
          <img src={srcImage}/>
        </button>
        <div className="flex flex-col">
          <span className={`text-sm font-Quicksand ${textDecoration} transition-all duration-200 ease-in-out`}>{text}</span>
          <span className="font-Quicksand text-xs">{nameProject}</span>
        </div>
      </div>
      <button className="bg-unset cursor-pointer w-6 h-6 transition-transform transform hover:scale-110">
        <img onClick={onDelete} src='/x-circle.svg' className="hover:filter hover:saturate-200"/>
      </button>
    </div>
  );
}

export { TodoItem }