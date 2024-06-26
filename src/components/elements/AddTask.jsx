import { CiCalendarDate, CiCirclePlus } from 'react-icons/ci'
import { useContext, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { ProjectContext } from '../../contexts/ProjectsContext'
import { TaskContext } from '../../contexts/TaskContext'
import { Input } from './Input'
import 'react-toastify/dist/ReactToastify.css'

export function AddTask ({ projectId }) {
  const { addTaskToProject } = useContext(ProjectContext)
  const { addTask, generateUniqueId, getCurrentLocalDate } = useContext(TaskContext)

  const [date, setDate] = useState('')
  const [inputName, setInputName] = useState('')

  const notify = () => {
    toast('Type the task name', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      progressClassName: 'pblue-500'
    })
  }

  // In case the user doesn't type the task name, a toast will be shown
  function handleAddTask () {
    if (inputName === '') {
      notify()
    } else {
      const taskId = generateUniqueId()
      const rawDate = date || getCurrentLocalDate()
      addTask(taskId, inputName, rawDate)
      // In case this component is being used in a project page, the task will be added to the project
      projectId && addTaskToProject(projectId, taskId)
      setInputName('')
      setDate('')
    }
  }

  return (
    <>
      <ToastContainer position='top-center' autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <section className='max-w-lg px-3 py-2 pl-5 mt-2 w-11/12 rounded-3xl flex justify-between items-center shadow-md border-slate-400 border border-opacity-5 dark:border-opacity-40'>
        <Input value={inputName} onChange={setInputName} mainFunction={handleAddTask} text='small' placeholder={"Task's name"} />
        <div className='flex items-center gap-3'>
          <div className='relative flex items-center'>
            <input
              type='date'
              className='block outline-none rounded-md focus:ring-0 h-10 w-12 pl-20 text-transparent content-none z-10 bg-transparent focus:bg-transparent hover:cursor-pointer'
              onChange={(e) => setDate(e.target.value)}
            />
            <CiCalendarDate size={40} className='text-zinc-400 hover:cursor-pointer absolute right-0' />
          </div>
          <button
            title='Add new task'
            className='cursor-pointer outline-none hover:rotate-90 duration-300 p-0'
            onClick={handleAddTask}
          >
            <CiCirclePlus size={40} className='text-zinc-400 duration-300 font-bold hover:text-pgreen-600 transition-colors' />
          </button>
        </div>
      </section>
    </>
  )
}
