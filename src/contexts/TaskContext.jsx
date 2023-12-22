import { createContext, useState, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const { item: tasks, updateInfo: setTasks, loading, error } = useLocalStorage('TASKS_V1', []);
  const [eventListeners, setEventListeners] = useState([]);

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

  // Function to add a task at the end.
  function addTask(text, date ) {
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
  function generateMessage(tasks) {
    if(tasks == []) return null
    const completedTasks = tasks.filter( task => task.completed ).length;
    if(completedTasks == tasks.length && tasks.length == 0){
      return (
        <p className="text-xs font-Quicksand text-gray-font"> No tasks, you can rest for today 😎</p>
      )
    } if (completedTasks == tasks.length && tasks.length != 0) {
      return (
        <p className="text-xs font-Quicksand text-gray-font"> You have done everything for today! Keep going 😉 </p>
      )
    } else {
      return (
        <p className="text-xs font-Quicksand text-gray-font">You have finished
          <span className="font-bold ml-1">{completedTasks}</span> of
          <span className="font-bold ml-1">{tasks.length}</span> tasks.
        </p>
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

  // This function returns the tasks filtered by date, it returns an array of objects with the task and the color class
  function filterTasksByDate(tasks) {
    console.log('Tasks: ',tasks);
    if(tasks == []) return null
    const filteredTasks = tasks.map(task => {
      const formattedDate = generateFormatDate(task.date);
      let colorClass = '';

      switch (formattedDate) {
        case 'today':
          colorClass = 'bg-red-500'; // Today
          break;
        case 'yesterday':
          colorClass = 'bg-orange-500'; // Yesterday
          break;
        case 'tomorrow':
          colorClass = 'bg-blue-500'; // Tomorrow
          break;
        case 'last month':
          colorClass = 'bg-pink-500'; // Last month
          break;
        case 'next month':
          colorClass = 'bg-red-500'; // Next month
          break;
        default:
          if (formattedDate.includes('days ago')) {
            colorClass = 'bg-yellow-500'; // Past week
          } else if (formattedDate.includes('weeks ago')) {
            colorClass = 'bg-purple-500'; // Past month
          } else if (formattedDate.includes('in ') && formattedDate.includes(' days')) {
            colorClass = 'bg-green-500'; // This week
          } else if (formattedDate.includes('in ') && formattedDate.includes(' weeks')) {
            colorClass = 'bg-mint-500'; // This month
          } else {
            colorClass = 'bg-gray-500'; // Other
          }
          break;
      }
      return { ...task, formattedDate, colorClass };
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
      completeTask,
      useTaskContext,
      generateMessage,
      filterTasksByDate,
      subscribeToEvents,
      generateFormatDate,
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