import { createContext, useState, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const { item: tasks, updateInfo: setTasks, loading, error } = useLocalStorage('TASKS_V1', []);
  const [ eventListeners, setEventListeners ] = useState([]);

  const subscribeToEvents = (listener) => {
    setEventListeners((prevListeners) => [...prevListeners, listener]);
  };

  const notifyEventListeners = () => {
    eventListeners.forEach((listener) => listener());
  };

  // Function to generate ids
  function generateUniqueId() {
    return Date.now(); // It uses the timestamp as id
  }

  function getCurrentLocalDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Function to add a task at the end.
  function addTask(id, text, date ) {
    const newTask = {
      id: id,
      text: text,
      date: date,
      completed: false
    };

    setTasks([...tasks, newTask]);
  }

  // Function to set the completed state
  function completeTask(taskId) {
    setTasks(tasks.map(t => {
      if(t.id === taskId){
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
  function deleteTask(taskId){
    setTasks(tasks.filter( t => t.id !== taskId ))
  }

  function editTextTask(taskId, newText) {
    newText == '' ? newText = 'New Task' : null;
    setTasks(tasks.map(t => {
      if(t.id === taskId){
        return {
          ...t,
          text: newText
        }
      } else {
        return t
      }
    }))
  }

  // This function generates a messages in base on the completed tasks and its lenght
  function generateMessage(tasks) {
    if(tasks == []) return null
    const completedTasks = tasks.filter( task => task.completed ).length;
    if(completedTasks == tasks.length && tasks.length == 0){
      return (
        <span> No tasks, you can rest for today 😎</span>
      )
    } if (completedTasks == tasks.length && tasks.length != 0) {
      return (
        <span> You have done everything for today! Keep going 😉 </span>
      )
    } else {
      return (
        <span>You have finished
          <span className="font-bold ml-1">{completedTasks}</span> of
          <span className="font-bold ml-1">{tasks.length}</span> tasks.
        </span>
      )
    }
  }

  // This function returns the date in a friendlier format with dateString as parameter
  function generateFormatDate(dateString) {
    const dateParts = dateString.split('-');
    const [ year, month, day ] = dateParts;

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const date = new Date(year, month - 1, day);
    const timeDiff = date.getTime() - today.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

    let result;

    switch (true) {
      case daysDiff === -1:
        result = 'yesterday';
        break;
      case daysDiff < 0 && daysDiff >= -7:
        result = `${-daysDiff} days ago`;
        break;
      case daysDiff >= -30 && daysDiff < 0: {
        const weeksAgo = Math.floor(-daysDiff / 7);
        result = `${weeksAgo} weeks ago`;
        break;
      }
      case date.getMonth() === today.getMonth() - 1 && daysDiff < 0:
        result = 'last month';
        break;
      case daysDiff === 0:
        result = 'today';
        break;
      case daysDiff === 1:
        result = 'tomorrow';
        break;
      case daysDiff <= 7:
        result = `in ${daysDiff} days`;
        break;
      case daysDiff <= 30: {
        const weeksFuture = Math.floor(daysDiff / 7);
        result = `in ${weeksFuture} weeks`;
        break;
      }
      case date.getMonth() === today.getMonth() + 1:
        result = 'next month';
        break;
      default:
        result = date.toLocaleDateString();
        break;
    }

    return result;
  }

  function editDateTask(taskId, newDate) {
    setTasks(tasks.map(t => {
      if(t.id === taskId){
        return {
          ...t,
          date: newDate
        }
      } else {
        return t
      }
    }))
  }

  // This function returns the tasks filtered by date
  function filterTasksByDate(tasks) {
    if(tasks == []) return null
    const filteredTasks = tasks.map(task => {
      const formattedDate = generateFormatDate(task.date);
      return { ...task, formattedDate };
    });
    return filteredTasks;
  }

  return (
    <TaskContext.Provider value={{
      loading,
      error,
      tasks,
      addTask,
      deleteTask,
      editTextTask,
      completeTask,
      editDateTask,
      useTaskContext,
      generateMessage,
      generateUniqueId,
      filterTasksByDate,
      subscribeToEvents,
      generateFormatDate,
      getCurrentLocalDate,
      notifyEventListeners,
    }}>
      { children }
    </TaskContext.Provider>
  )
}

const useTaskContext = () => {
  return useContext(TaskContext);
};

export { TaskContext, TaskProvider }
