import { TextInput } from "./TextInput";
import { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import { TaskContext } from "../../contexts/TaskContext";
import { CiCirclePlus, CiCalendarDate } from "react-icons/ci";
import { ProjectContext } from "../../contexts/ProjectsContext";

function AddTask({ projectId }) {
  const { addTask } = useContext(TaskContext);
  const { addTaskToProject } = useContext(ProjectContext);

  const [ date, setDate ] = useState('')
  const [ inputName, setInputName ] = useState('');

  const notify = () => {
      toast('Type the task name', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      progressClassName: "primary-blue"
    });
  }

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

  // In case the user doesn't type the task name, a toast will be shown
  function handleAddTask() {
    if (inputName === '') {
      notify();
    } else {
      const taskId = generateUniqueId()
      const rawDate = date || getCurrentLocalDate();
      addTask(taskId, inputName, rawDate);
      projectId && addTaskToProject(projectId, taskId);
      setInputName('');
      setDate('');
    }
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      <section className="max-w-lg p-3 pl-5 mt-2 w-11/12 rounded-3xl flex justify-between items-center shadow-md border-slate-400 border border-opacity-5">
        <TextInput item={null} value={inputName} onChange={setInputName} setEdit={null} mainFunction={handleAddTask} text={'small'} placeholder={"Task's name"}/>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <input
              type="date"
              className="block outline-none rounded-md focus:ring-0 h-10 w-12 pl-20 text-transparent content-none z-10 bg-transparent focus:bg-transparent hover:cursor-pointer"
              onChange={(e) => setDate(e.target.value)}
            />
            <CiCalendarDate size={40} className="text-zinc-400 hover:cursor-pointer absolute right-0"/>
          </div>
          <button title="Add new task"
            className="cursor-pointer outline-none hover:rotate-90 duration-300 p-0"
            onClick={handleAddTask}
          >
            <CiCirclePlus size={40} className="text-zinc-400 duration-300 font-bold hover:text-light-green transition-colors"/>
          </button>
        </div>
      </section>
    </>
  )
}

export { AddTask }