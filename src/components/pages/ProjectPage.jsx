import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../../contexts/ProjectsContext';
import { TaskContext } from '../../contexts/TaskContext';
import { TodoItem } from '../elements/TodoItem';

export function ProjectPage() {
  const { tasks, completeTask, deleteTask, addProject, notifyEventListeners } = useContext(TaskContext);
  const { projects, removeTaskFromProject } = useContext(ProjectContext);
  console.log(projects, tasks);

  const { projectId } = useParams();
  const project = projects.find(project => project.id == projectId);
  console.log(project);

  const deleteATask = (taskId) => {
    deleteTask(taskId);
    removeTaskFromProject(taskId);
    notifyEventListeners();
  }

  return (
    <section>
      <h1>{project.name}</h1>
      <h2>Tasks</h2>
      { tasks.map(task => {
        if(task.projectId === projectId){
          return (
            <TodoItem
              key={task.id}
              task={task}
              onComplete={() => { completeTask(task.id) }}
              onDelete={() => { deleteATask(task.id) }}
              onAddProject={ addProject }
            />
          )
        }
      })}
    </section>
  )
}