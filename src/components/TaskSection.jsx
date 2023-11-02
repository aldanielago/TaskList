import { useContext } from "react";
import { AddTask } from "./elements/AddTask";
import { TodoItem } from "./elements/TodoItem";
import { LoadingTasks } from "./states/LoadingItems";
import { ErrorLoading } from "./states/ErrorLoading";
import { TaskContext } from "../contexts/TaskContext";

function TaskSection(){
  const { loading, error, tasks, generateMessage, deleteTask, completeTask } = useContext(TaskContext);

  return (
    <>
      { generateMessage() }
      <h3 className="pt-4 pl-4 font-Quicksand">Today&apos;s taks</h3>
      <section>
        
      </section>
      <section className="pl-4 w-full flex flex-col items-center">
        <AddTask/>
        { loading && ( <> <LoadingTasks/> <LoadingTasks/> <LoadingTasks/> </> )}
        { error && <ErrorLoading/>}
        { tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onComplete={() => { completeTask(task.id) }}
            onDelete={() => { deleteTask(task.id) }}
          />
        ))}
      </section>
    </>
  )
}

export { TaskSection }