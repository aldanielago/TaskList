import { AddTask } from "../elements/AddTask";
import { InformativeBox } from "../elements/InformativeBox";
import { Link } from "react-router-dom";
import { LoadingTasks } from "../states/LoadingItems";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { ProjectContext } from "../../contexts/ProjectsContext";
import { ProjectItem } from "../elements/ProjectItem";
import { TaskContext } from "../../contexts/TaskContext";
import { TodoItem } from "../elements/TodoItem";
import { useContext } from "react";

export function Home() {
  const { projects, addTaskToProject, removeTaskFromProject } = useContext(ProjectContext);
  const { loading, tasks, generateMessage, deleteTask, completeTask, notifyEventListeners } = useContext(TaskContext);

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
    <section className="w-full h-screen overflow-y-auto pl-6">
      <div className="pt-4">
        <h1 className="font-Quicksand font-bold text-lg">Hi there!</h1>
        <p className="text-xs font-Quicksand text-gray-font">{message}</p>
      </div>
      <section className="flex flex-col w-full md:flex-col-reverse">
        <section className="w-full flex flex-col items-center mt-2 pb-8 md:items-start">
          <h3 className="pt-4 font-Quicksand self-start text-sm font-semibold ">Today&apos;s taks</h3>
          <AddTask />
          {loading && <LoadingTasks />}
          {!loading && sortedTasks.length === 0 && <InformativeBox item="tasks" time="for today" />}
          {sortedTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onComplete={() => { completeTask(task.id) }}
              onDelete={() => { deleteATask(task.id) }}
              onAddProject={ addProject }
            />
          ))}
        </section>
        <section className="w-full flex flex-col pb-1">
          <h3 className="pt-2 font-Quicksand self-start text-sm font-semibold">Projects</h3>
          {loading && <LoadingTasks />}
          {!loading && projects.length === 0 && <InformativeBox item="projects yet." />}
          <section className="flex flex-col w-full md:flex-row overflow-x-auto pb-2 md:gap-4 md:items-start md:justify-start">
            {projects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id} className="w-full flex">
                <ProjectItem
                  project={project}
                />
              </Link>
            ))}
          </section>
          <Link to="/add-project" className="md:hidden">
            <PrimaryButton text="Add a project" />
          </Link>
        </section>
      </section>
    </section>
  );
}
