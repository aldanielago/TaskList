import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AddTask } from '../elements/AddTask';
import { ProjectContext } from '../../contexts/ProjectsContext';
import { SmallOptionsMenu } from '../elements/SmallOptionsMenu';
import { TaskContext } from '../../contexts/TaskContext';
import { TextInput } from '../elements/TextInput';
import { TodoItem } from '../elements/TodoItem';

export function ProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { tasks, completeTask, deleteTask, addProject, notifyEventListeners, generateMessage } = useContext(TaskContext);
  const { projects, removeTaskFromProject, deleteProject, changeNameProject, projectsPallete, changePalleteProject, changeProjectDescription, projectIcons, changeProjectIcon } = useContext(ProjectContext);

  const project = projects.find(project => project.id == projectId);
  const filteredTasks = tasks.filter(task => project.tasks.includes(task.id)) || [];
  const message = generateMessage(filteredTasks);

  const [ editName, setEditName ] = useState(false);
  const [ editIcon, setEditIcon ] = useState(false);
  const [ editPallete, setEditPallete ] = useState(false);
  const [ projectName, setProjectName ] = useState(project.name);
  const [ editDescription, setEditDescription ] = useState(false);
  const [ projectDescription, setProjectDescription ] = useState(project.description);

  useEffect(() => {
    setProjectName(project.name);
    setProjectDescription(project.description);
  }, [project]);

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
    <section className="w-full overflow-y-auto h-s flex flex-col items-center justify-center">
      <div className={`${project.primaryColor} relative w-full h-24 md:h-[20vh]`}>
        <button className={`p-2 rounded-md border ${project.primaryColor == 'bg-light-green' ? 'border-white text-white' : 'border-black'} tracking-wider font-Quicksand font-bold text-xs absolute bottom-4 right-4 transition-colors duration-500 ease-in-out`}
            onClick={() => setEditPallete(!editPallete)}
          >Change color
        </button>
      </div>

      <section className="w-full md:pl-6">
        { editPallete &&
          <div className="w-40 origin-top absolute right-4 top-[7rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {projectsPallete.map( p =>
              <button className={`block px-4 py-2 text-sm text-gray-700 w-full text-start ${p.primaryColor} hover:${p.secondaryColor} hover:cursor-pointer`}
                key={p.pallete}
                value={p.pallete}
                onClick={() => {handleChangePallete(p.pallete)}}
              >{p.name}
              </button>)}
          </div>
        }
        <div className="px-2 md:px-4 max-w-7xl grid w-full items-start py-2">
          <div className="flex items-center mt-6 gap-2 mb-2">
            <i className="text-3xl text-zinc-400 cursor-pointer" onClick={() => setEditIcon(true)}>{ project.icon ? projectIcons[project.icon].component : projectIcons[0].component }</i>
            { editIcon &&
              <div className="w-40 h-40 overflow-x-auto flex flex-wrap origin-top top-48 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                {projectIcons.map( (icon) =>
                  <button className={`block px-4 py-2 text-base text-gray-700 hover:cursor-pointer`}
                    key={icon.id}
                    value={icon.id}
                    onClick={() => {setEditIcon(false); changeProjectIcon(project.id, icon.id)}}
                  >{icon.component}
                  </button>)}
              </div>
            }
            { !editName
              ? <h1 className="font-bold inline tracking-wide font-Quicksand text-lg" onClick={() => setEditName(true)}>{ projectName == '' ? 'Untitle project' : projectName }</h1>
              : <TextInput text={'big'} item={project} value={projectName} onChange={setProjectName} setEdit={setEditName} mainFunction={changeNameProject} placeholder={'Project name'}/>
            }
            { !editName && <SmallOptionsMenu onDelete={onDeleteProject} /> }
          </div>

          { !editDescription
              ? <p className="text-xs font-Quicksand text-gray-font" onClick={() => setEditDescription(true)}>{projectDescription == '' ? 'Add a description' : projectDescription}</p>
              : <TextInput placeholder={'Description'} item={project} value={projectDescription} onChange={setProjectDescription} setEdit={setEditDescription} mainFunction={changeProjectDescription}/>
          }

          <h2 className="font-Quicksand text-lg font-semibold mt-4">Tasks</h2>
          { filteredTasks.length == 0 ? <p className="font-Quicksand mt-2 text-sm">Add your first task for this project!</p> : <p className="font-Quicksand mt-2 text-sm">{ message }</p> }
          <AddTask projectId={project.id}/>

          { filteredTasks.length > 0 && <>
            <div className=" w-full py-2">
              {filteredTasks.map(task => (
              <TodoItem
                key={task.id}
                task={task}
                showDate={false}
                showProject={false}
                onComplete={() => { completeTask(task.id) }}
                onDelete={() => { deleteATask(task.id) }}
                onAddProject={ addProject }
              />
            ))}
            </div>
          </>}
        </div>
      </section>
    </section>
  );
}
