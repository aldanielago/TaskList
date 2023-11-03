import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const { item: tasks, updateInfo: setTasks, loading, error } = useLocalStorage('TASKS_V1', []);

  // Function to generate ids
  function generateUniqueId() {
    return Date.now(); // It uses the timestamp as id
  }

  // Function to add a task at the end.
  function addTask(text, date) {
    const newTask = {
      id: generateUniqueId(),
      text: text,
      date: date,
      completed: false
    };

    setTasks([...tasks, newTask]);
  }

  // Function to set the completed state
  function completeTask(idTask) {
    setTasks(tasks.map(t => {
      if(t.id === idTask){
        return {
          ...t,
          completed: !t.completed
        }
      } else {
        return t
      }
    }))
  }

  // Function to delete a task
  function deleteTask(idTask){
    setTasks(tasks.filter( t => t.id !== idTask ))
  }

  // This function generates a messages in base on the completed tasks and its lenght
  function generateMessage() {
    const completedTasks = tasks.filter( task => task.completed ).length;
    if(completedTasks == tasks.length && tasks.length == 0){
      return (
        <p className="text-xs pl-4 font-Quicksand text-gray-font"> No tasks, you can rest for today 😎</p>
      )
    } if (completedTasks == tasks.length && tasks.length != 0) {
      return (
        <p className="text-xs pl-4 font-Quicksand text-gray-font"> You have done everything for today! Keep going 😉 </p>
      )
    } else {
      return (
        <p className="pl-4 text-xs font-Quicksand text-gray-font">You have finished
          <span className="font-bold ml-1">{completedTasks}</span> of
          <span className="font-bold ml-1">{tasks.length}</span> tasks.
        </p>
      )
    }
  }

  return (
    <TaskContext.Provider value={{
      loading,
      error,
      tasks,
      generateMessage,
      addTask,
      completeTask,
      deleteTask
    }}>
      { children }
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskProvider }