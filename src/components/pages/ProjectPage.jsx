import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../../contexts/ProjectsContext';
import { TaskContext } from '../../contexts/TaskContext';
import { TodoItem } from '../elements/TodoItem';
import { InformativeBox } from '../elements/InformativeBox';

export function ProjectPage() {
  const { tasks, completeTask, deleteTask, addProject, notifyEventListeners, generateMessage } = useContext(TaskContext);
  const { projects, removeTaskFromProject } = useContext(ProjectContext);

  const { projectId } = useParams();
  const project = projects.find(project => project.id == projectId);
  const filteredTasks = tasks.filter(task => project.tasks.includes(task.id)) || [];
  const message = generateMessage(filteredTasks);

  const deleteATask = (taskId) => {
    deleteTask(taskId);
    removeTaskFromProject(taskId);
    notifyEventListeners();
  }

  return (
    <section>
      <div className={`${project.primaryColor} w-full h-1/4`}></div>
      <h1>{ project.name }</h1>
      { message }
      { filteredTasks.length == 0 && <InformativeBox item="projects yet."/>}
      { filteredTasks.length > 0 && <>
        <h2>Tasks</h2>
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
      </>}
    </section>
  )
}