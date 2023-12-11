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
  const { loading, error, tasks, generateMessage, deleteTask, completeTask } = useContext(TaskContext);
  const { projects } = useContext(ProjectContext);

  const sortedTasks = tasks.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  return (
    <section>
      <h1 className="font-Quicksand font-bold text-lg pl-4 pt-4">Hi there!</h1>
      { generateMessage() }
      <section className="flex flex-col md:flex-row">
        <section className="pl-4 w-full flex flex-col items-center">
          <h3 className="pt-4 pl-4 font-Quicksand self-start">Today&apos;s taks</h3>
          <AddTask/>
          { loading && <LoadingTasks/>}
          { error && <ErrorLoading/>}
          { sortedTasks.length === 0 && <InformativeBox item="tasks" time="for today"/>}
          { sortedTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onComplete={() => { completeTask(task.id) }}
              onDelete={() => { deleteTask(task.id) }}
            />
          ))}
          <Link to="/tasks">
            <PrimaryButton text="See more"/>
          </Link>
        </section>
        <section className="pl-4 w-full flex flex-col items-center">
          <h3 className="pt-4 pl-4 font-Quicksand self-start">Projects</h3>
          { loading && <LoadingTasks/>}
          { error && <ErrorLoading/>}
          { projects.length === 0 && <InformativeBox item="projects" time="for today"/>}
          { projects.map((project) => (
            <ProjectItem
              key={project.id}
              name={project.name}
              team={project.bgColor}
              colorProgressBar={project.secondaryColor}
            />
          ))}
          <Link to="/add-project">
            <PrimaryButton text="Add a project"/>
          </Link>
        </section>
      </section>
    </section>
  )
}