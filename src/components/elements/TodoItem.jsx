import { useState } from 'react';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

function TodoItem({ task, onComplete, onDelete}) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [textDecoration, setTextDecoration] = useState('no-underline');

  const handleButtonClick = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      setTextDecoration('line-through');
    } else {
      setIsCompleted(false);
      setTextDecoration('no-underline');
    }
    onComplete();
  };

  return (
    <div className="bg-secondary-light max-w-lg p-3 mt-2 w-11/12 rounded-3xl flex gap-3 items-center justify-between shadow-md">
      <div className='flex gap-4'>
        <button className="bg-unset cursor-pointer" onClick={handleButtonClick}>
          {task.completed ? <BsCheckCircle size={30} className='text-green-600'/> : <BsCheckCircle size={30} className="text-zinc-400"/>}
        </button>
        <div className="flex flex-col">
          <span className={`text-sm font-Quicksand ${textDecoration} transition-all duration-200 ease-in-out`}>
            {task.text}
          </span>
          <span className="font-Quicksand text-xs">{task.date}</span>
        </div>
      </div>
      <button>
        <BsXCircle onClick={onDelete} size={30} className="text-zinc-400 hover:text-red-400 transition-colors ease-linear "/>
      </button>
    </div>
  );

}

export { TodoItem }