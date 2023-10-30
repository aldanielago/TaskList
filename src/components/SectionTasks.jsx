import { TodoItem } from "./elements/TodoItem";
import { useLocalStorage } from "../hooks/useLocalStorage"
import { LoadingTasks } from "./states/LoadingItems";
import { ErrorLoading } from "./states/ErrorLoading";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { AddTask } from "./elements/AddTask";
import { useState } from "react";

function SectionTasks(){
  const {
    item: tasks,
    updateInfo: setTasks,
    loading,
    error
  } = useLocalStorage('TASKS_V1', []);
  const [ openModal, setOpenModal ] = useState(true);
  const completedTasks = tasks.filter( task => !!task.completed).length;
  const totalTasks = tasks.length;
  let message = 'You have work today';

  // This function complete and delete a task and update the state and localstorage at the end.
  const updateTasks = (text, action) => {
    const newTasks = [...tasks];
    const indexTask = newTasks.findIndex(
      (task) => task.text == text
    );

    action == 'complete'
      ? newTasks[indexTask].completed == true ? newTasks[indexTask].completed = false : newTasks[indexTask].completed = true
      : newTasks.splice(indexTask, 1);

      setTasks(newTasks);
  };

  const handleOpenModal = () => {
    setOpenModal(openModal ? false : true)
  }

  // This part changes the firt phrase in case the user have done everything or not.
  if(completedTasks == totalTasks){
    message = (
      <p className="text-xs pl-4 font-Quicksand text-gray-font">
        You have done everything for today! Keep going 😉
      </p>
    )
  } else {
    message = (
      <p className="text-xs pl-4 font-Quicksand text-gray-font">You have finished
        <span className="font-bold ml-1">{completedTasks}</span> of
        <span className="font-bold ml-1">{totalTasks}</span> taks.
      </p>
    )
  }

  return (
    <section>
      { message }
      <h3 className="pt-4 pl-4 font-Quicksand">Today&apos;s taks</h3>
      <div className="pl-4 w-full flex flex-col items-center">
        <AddTask/>
        { loading && (
          <>
            <LoadingTasks/>
            <LoadingTasks/>
            <LoadingTasks/>
          </>
        )}
        { error && <ErrorLoading/>}
        { tasks.map((task) => (
          <TodoItem key={task.text} text={task.text} nameProject={task.nameProject} completed={task.completed}
            onComplete={() => { updateTasks(task.text, 'complete') }}
            onDelete={() => { updateTasks(task.text, 'delete') }}
          />
        ))}
      <PrimaryButton text="Add new task" onClick={handleOpenModal}/>
      </div>
    </section>
  )
}

export { SectionTasks }