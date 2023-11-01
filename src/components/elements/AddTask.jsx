import { useContext, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { TaskContext } from "../../contexts/TaskContext";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function AddTask() {
  const [ inputName, setInputName ] = useState('');
  const [ project, setProject ] = useState('');
  const { addTask } = useContext(TaskContext);

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

  function handleAddTask() {
    if(inputName == ''){
      notify();
    } else {
      addTask(inputName, project);
      setProject('Project');
      setInputName('');
    }
  }

  return (
    <div className="max-w-lg p-3 pl-5 mt-2 w-11/12 rounded-3xl flex justify-between items-center shadow-md border-slate-400 border border-opacity-5">
      <input
        id="nameTask"
        type="text"
        placeholder="Task name"
        value={inputName}
        className="pl-0 pb-1 font-Quicksand text-sm border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-primary-blue transition-colors ease-linear delay-200 duration-150 form-input w-1/2"
        onChange={(e) => setInputName(e.target.value)}
      />

      <label htmlFor="nameProject" className="w-1/4">
        <select className="font-Quicksand text-sm w-full" onChange={(e) => {setProject(e.target.value)}}>
          <option value="Default">Project</option>
        </select>
      </label>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      <button title="Add new task"
        className="cursor-pointer outline-none hover:rotate-90 duration-300 p-0"
        onClick={handleAddTask}
      >
        <CiCirclePlus size={38} className="text-zinc-400 duration-300 font-bold hover:text-light-green transition-colors"/>
      </button>
    </div>
  )
}

export { AddTask }