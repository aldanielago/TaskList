import { BsCheckCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ProjectContext } from '../../contexts/ProjectsContext';
import { SmallOptionsMenu } from '../elements/SmallOptionsMenu';
import { TaskContext } from '../../contexts/TaskContext';
import { TextInput } from '../elements/TextInput';

export function TodoItem({ task, onDelete, onComplete, onAddProject, showDate = true, showProject = true }) {
  const { generateFormatDate, editTextTask, editDateTask } = useContext(TaskContext);
  const { projects } = useContext(ProjectContext);

  const [ name, setName ] = useState(task.text);
  const [ editName, setEditName ] = useState(false);
  const [ date, setDate ] = useState(task.date);
  const [ editDate, setEditDate ] = useState(false);

  const friendlyDate = generateFormatDate(date);
  const projectTask = projects.find(p => p.tasks.includes(task.id));

  return (
    <section className="bg-secondary-light max-w-lg p-3 mt-2 w-11/12 rounded-3xl flex gap-3 items-center justify-between shadow-md">
      <button className="bg-unset cursor-pointer" onClick={onComplete}>
      <BsCheckCircle size={30} className={`${task.completed ? "text-green-600" : "text-zinc-400"} transition-colors duration-200 delay-150 ease-in-out`}/>
      </button>
      <div className="flex flex-col w-full">
        { editName
          ? <TextInput item={task} value={name} onChange={setName} setEdit={setEditName} mainFunction={editTextTask} text={'small'} placeholder={'New name'}/>
          : <span className={`text-sm font-Quicksand ${task.completed ? 'line-through' : 'no-underline'} line-clamp-1 transition-all duration-300 ease-in-out`} onClick={() => setEditName(true)}>{ name == '' ? 'New task' : name}</span>
        }
        <div className='flex items-center'>
          { ( showDate && editDate )
            ? <TextInput item={task} value={date} onChange={setDate} setEdit={setEditDate} mainFunction={editDateTask} text={'small'} type="date"/>
            : <span className={`text-xs font-Quicksand transition-all duration-200 ease-in-out`} onClick={() => setEditDate(true)}>{ friendlyDate }</span>
          }

          { ( showDate && showProject ) && <span className="text-xs inline-block font-Quicksand mx-2 text-gray-font"> • </span>}
          { ( showProject && projectTask && !editDate )  &&
            <Link to={`/projects/${projectTask.id}`} key={projectTask.id}>
              <span className={`text-xs inline-block font-Quicksand ${projectTask.secondaryColor} px-2 rounded-lg`}>{ projectTask.name }</span>
            </Link>
          }
        </div>
      </div>
      <SmallOptionsMenu item={task} onDelete={onDelete} onAddProject={onAddProject}/>
    </section>
  );
}