import { useState } from 'react';

function TodoItem({ text, tasks}) {
  const [ srcImage, setSrcImage ] = useState('/circle.svg');
  const [ textDecoration, setTextDecoration ] = useState('no-underline');

  const handleButtonClick = () => {
    srcImage == '/circle.svg' ? setSrcImage('/check-circle.svg') : setSrcImage('/circle.svg');
    textDecoration == 'no-underline' ? setTextDecoration('line-through') : setTextDecoration('no-underline')
  }

  return (
    <div className="bg-secondary-light max-w-lg p-3 mt-2 w-11/12 rounded-3xl flex gap-3 items-center shadow-md">
      <button className="bg-unset cursor-pointer" onClick={handleButtonClick}>
        <img className='transition-all duration-150 ease-in-out' src={srcImage} alt=""/>
      </button>
      <div className="flex flex-col">
        <span className={`text-sm font-Quicksand ${textDecoration} transition-all duration-200 ease-in-out`}>{text}</span>
        <span className="font-Quicksand text-xs">{tasks} taks to do</span>
      </div>
    </div>
  );
}

export { TodoItem }