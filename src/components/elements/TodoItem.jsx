import { useState, useContext } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { TaskContext } from '../../contexts/TaskContext';
import { SmallOptionsMenu } from '../elements/SmallOptionsMenu';
import { ProjectContext } from '../../contexts/ProjectsContext';

function TodoItem({ task, onDelete, onComplete, onAddProject, showDate = true }) {
  const { generateFormatDate } = useContext(TaskContext);
  const { projects } = useContext(ProjectContext);
  const [ isCompleted, setIsCompleted ] = useState(false);
  const [ textDecoration, setTextDecoration ] = useState('no-underline');
  const friendlyDate = generateFormatDate(task.date);
  const projectTask = projects.find(p => p.tasks.includes(task.id));

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
          <div className='flex'>
            { showDate && <span className="text-xs font-Quicksand inline text-gray-font">{friendlyDate}</span>}
            { (showDate && projectTask) && <span className="text-xs inline-block font-Quicksand mx-2 text-gray-font"> • </span>}
            { projectTask && <span className="text-xs inline-block font-Quicksand text-gray-font">{projectTask.name}</span>}
          </div>
        </div>
      </div>
      <SmallOptionsMenu item={task} onDelete={onDelete} onAddProject={onAddProject}/>
    </div>
  );

}

export { TodoItem }