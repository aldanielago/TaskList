import { useContext } from "react";
import { AddTask } from "./elements/AddTask";
import { TodoItem } from "./elements/TodoItem";
import { LoadingTasks } from "./states/LoadingItems";
import { ErrorLoading } from "./states/ErrorLoading";
import { TaskContext } from "../contexts/TaskContext";

function SectionTasks(){
  const { loading, error, tasks, updateTasks, message } = useContext(TaskContext);

  return (
    <section>
      { message }
      <h3 className="pt-4 pl-4 font-Quicksand">Today&apos;s taks</h3>
      <div className="pl-4 w-full flex flex-col items-center">
        <AddTask/>
        { loading && ( <> <LoadingTasks/> <LoadingTasks/> <LoadingTasks/> </> )}
        { error && <ErrorLoading/>}
        { tasks.map((task) => (
          <TodoItem key={task.text} text={task.text} nameProject={task.nameProject} completed={task.completed}
            onComplete={() => { updateTasks(task.text, 'complete') }} onDelete={() => { updateTasks(task.text, 'delete') }}
          />
        ))}
      </div>
    </section>
  )
}

export { SectionTasks }