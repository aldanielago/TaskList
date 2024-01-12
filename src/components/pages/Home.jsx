import { useContext } from "react";
import { Link } from "react-router-dom";
import { AddTask } from "../elements/AddTask";
import { TodoItem } from "../elements/TodoItem";
import { ProjectItem } from "../elements/ProjectItem";
import { LoadingTasks } from "../states/LoadingItems";
import { ErrorLoading } from "../states/ErrorLoading";
import { TaskContext } from "../../contexts/TaskContext";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { InformativeBox } from "../elements/InformativeBox";
import { ProjectContext } from "../../contexts/ProjectsContext";

export function Home() {
  const { loading, error, tasks, generateMessage, deleteTask, completeTask, notifyEventListeners } = useContext(TaskContext);
  const { projects, addTaskToProject, removeTaskFromProject } = useContext(ProjectContext);

  const sortedTasks = tasks.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  const addProject = (taskId, projectId) => {
    removeTaskFromProject(taskId);
    addTaskToProject(projectId, taskId);
    notifyEventListeners();
  }

  const deleteATask = (taskId) => {
    deleteTask(taskId);
    removeTaskFromProject(taskId);
    notifyEventListeners();
  }

  const message = generateMessage(tasks);

  return (
    <section className="w-full h-screen overflow-y-auto">
      <div className="pl-4 pt-4">
        <h1 className="font-Quicksand font-bold text-lg">Hi there!</h1>
        <p className="text-xs font-Quicksand text-gray-font">{ message }</p>
      </div>
      <section className="flex flex-col w-full">
        <section className="w-full flex flex-col items-center mt-2">
          <h3 className="pt-4 pl-4 font-Quicksand self-start text-sm font-semibold ">Today&apos;s taks</h3>
          <AddTask/>
          { loading && <LoadingTasks/>}
          { error && <ErrorLoading/>}
          { !loading && sortedTasks.length === 0 && <InformativeBox item="tasks" time="for today"/>}
          { sortedTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onComplete={() => { completeTask(task.id) }}
              onDelete={() => { deleteATask(task.id) }}
              onAddProject={ addProject }
            />
          ))}
        </section>
        <section className="w-full flex flex-col items-center">
          <h3 className="pt-2 pl-4 font-Quicksand self-start text-sm font-semibold ">Projects</h3>
          { loading && <LoadingTasks/>}
          { error && <ErrorLoading/>}
          { !loading && projects.length === 0 && <InformativeBox item="projects yet."/>}
          { projects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className="w-full flex justify-center">
              <ProjectItem
                project={project}
              />
            </Link>
          ))}
          <Link to="/add-project">
            <PrimaryButton text="Add a project"/>
          </Link>
        </section>
      </section>
    </section>
  )
}