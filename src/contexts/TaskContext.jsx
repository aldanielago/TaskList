import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const {
    item: tasks,
    updateInfo: setTasks,
    loading,
    error
  } = useLocalStorage('TASKS_V1', []);

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

  // This part changes the firt phrase in case the user have done everything or not.
  if(completedTasks == totalTasks){
    message = (
      <p className="text-xs pl-4 font-Quicksand text-gray-font">
        You have done everything for today! Keep going 😉
      </p>
    )
  } else {
    message = (
      <p className="pl-4 text-xs font-Quicksand text-gray-font">You have finished
        <span className="font-bold ml-1">{completedTasks}</span> of
        <span className="font-bold ml-1">{totalTasks}</span> taks.
      </p>
    )
  }
  return (
    <TaskContext.Provider value={{
      loading,
      error,
      tasks,
      updateTasks,
      message
    }}>
      { children }
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskProvider }