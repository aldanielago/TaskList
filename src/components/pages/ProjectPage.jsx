import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TodoItem } from '../elements/TodoItem';
import { TaskContext } from '../../contexts/TaskContext';
import { InformativeBox } from '../elements/InformativeBox';
import { SmallOptionsMenu } from '../elements/SmallOptionsMenu';
import { ProjectContext } from '../../contexts/ProjectsContext';

export function ProjectPage() {
  const { tasks, completeTask, deleteTask, addProject, notifyEventListeners, generateMessage } = useContext(TaskContext);
  const { projects, removeTaskFromProject, deleteProject } = useContext(ProjectContext);
  const navigate = useNavigate();

  const { projectId } = useParams();
  const project = projects.find(project => project.id == projectId);
  const filteredTasks = tasks.filter(task => project.tasks.includes(task.id)) || [];
  const message = generateMessage(filteredTasks);

  const deleteATask = (taskId) => {
    deleteTask(taskId);
    removeTaskFromProject(taskId);
    notifyEventListeners();
  }

  const onDeleteProject = () => {
    deleteProject(project.id);
    notifyEventListeners();
    navigate('/');
  }

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <div className={`${project.primaryColor} w-full h-28`}></div>
      <div className="px-4 max-w-7xl grid w-full items-start">
        <div className="flex items-center mt-6 gap-2">
          <SmallOptionsMenu item={project} onDelete={onDeleteProject}/>
          <h1 className="font-bold inline tracking-wide font-Quicksand text-lg">{ project.name }</h1>
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