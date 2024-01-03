import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TodoItem } from '../elements/TodoItem';
import { TaskContext } from '../../contexts/TaskContext';
import { InformativeBox } from '../elements/InformativeBox';
import { SmallOptionsMenu } from '../elements/SmallOptionsMenu';
import { ProjectContext } from '../../contexts/ProjectsContext';
import { TextInput } from '../elements/TextInput';

export function ProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { tasks, completeTask, deleteTask, addProject, notifyEventListeners, generateMessage } = useContext(TaskContext);
  const { projects, removeTaskFromProject, deleteProject, changeNameProject, projectsPallete, changePalleteProject } = useContext(ProjectContext);

  const project = projects.find(project => project.id == projectId);
  const filteredTasks = tasks.filter(task => project.tasks.includes(task.id)) || [];
  const message = generateMessage(filteredTasks);

  const [ editName, setEditName ] = useState(false);
  const [ projectName, setProjectName ] = useState(project.name);
  const [ editPallete, setEditPallete ] = useState(false);

  const deleteATask = (taskId) => {
    deleteTask(taskId);
    removeTaskFromProject(taskId);
    notifyEventListeners();
  }

  const onDeleteProject = () => {
    deleteProject(project.id);
    navigate('/');
  }

  const handleChangePallete = (newPalleteId) => {
    setEditPallete(false);
    changePalleteProject(project.id, newPalleteId);
  }

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <div className={`${project.primaryColor} w-full h-28 relative`}>
        <button className={`p-2 rounded-md border ${project.primaryColor == 'bg-light-green' ? 'border-white text-white' : 'border-black'} tracking-wider font-Quicksand font-bold text-xs absolute bottom-4 right-4 transition-colors duration-500 ease-in-out`}
            onClick={() => setEditPallete(!editPallete)}
          >Change color
        </button>
      </div>
      { editPallete && <div className="w-40 origin-top absolute right-4 top-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        {projectsPallete.map( p =>
          <button className={`block px-4 py-2 text-sm text-gray-700 w-full text-start ${p.primaryColor} hover:${p.secondaryColor} hover:cursor-pointer`}
            key={p.pallete}
            value={p.pallete}
            onClick={() => {handleChangePallete(p.pallete)}}
          >{p.name}
          </button>)}
      </div>}
      <div className="px-4 max-w-7xl grid w-full items-start">
        <div className="flex items-center mt-6 gap-2">
          <SmallOptionsMenu item={ project } onDelete={onDeleteProject}/>
          { !editName
            ? <h1 className="font-bold inline tracking-wide font-Quicksand mb-2 text-lg" onClick={() => setEditName(true)}>{ projectName }</h1>
            : <TextInput item={project} value={projectName} onChange={setProjectName} setEdit={setEditName} mainFunction={changeNameProject}/>
          }
        </div>
        { message }
        { filteredTasks.length == 0 && <InformativeBox item="tasks yet."/>}
        { filteredTasks.length > 0 && <>
          <h2 className="font-Quicksand text-lg font-semibold mt-4">Tasks</h2>
          <div className="flex items-center flex-col w-full">
            {filteredTasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              showDate={false}
              onComplete={() => { completeTask(task.id) }}
              onDelete={() => { deleteATask(task.id) }}
              onAddProject={ addProject }
            />
          ))}
          </div>
        </>}
      </div>
    </section>
  )
}