import { useContext } from "react";
import { AddTask } from "../elements/AddTask";
import { ProjectItem } from "../elements/ProjectItem";
import { TodoItem } from "../elements/TodoItem";
import { LoadingTasks } from "../states/LoadingItems";
import { ErrorLoading } from "../states/ErrorLoading";
import { TaskContext } from "../../contexts/TaskContext";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { Link } from "react-router-dom";

export function Home() {
  const { loading, error, tasks, generateMessage, deleteTask, completeTask } = useContext(TaskContext);
  const orderedTasks = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section>
      <h1 className="font-Quicksand font-bold text-lg pl-4 pt-4">Hi there!</h1>
      { generateMessage() }
      <h3 className="pt-4 pl-4 font-Quicksand">Today&apos;s taks</h3>
      <section className="pl-4 w-full flex flex-col items-center">
        <AddTask/>
        { loading && <LoadingTasks/>}
        { error && <ErrorLoading/>}
        { orderedTasks.map((task) => (
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
      <h3 className="pt-4 pl-4 font-Quicksand">Projects</h3>
      <section className="pl-4 w-full flex flex-col items-center">
        { loading && <LoadingTasks/>}
        { error && <ErrorLoading/>}
        <ProjectItem/>
        <Link to="/add-project">
          <PrimaryButton text="Add a project"/>
        </Link>
      </section>
    </section>
  )
}