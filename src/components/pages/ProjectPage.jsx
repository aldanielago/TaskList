import { AddTask } from '../elements/AddTask'
import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HiArrowCircleLeft } from 'react-icons/hi'
import { ProjectContext } from '../../contexts/ProjectsContext'
import { SmallOptionsMenu } from '../elements/SmallOptionsMenu'
import { TaskContext } from '../../contexts/TaskContext'
import { Input } from '../elements/Input'
import { TodoItem } from '../elements/TodoItem'

export function ProjectPage () {
  const navigate = useNavigate()
  const { projectId } = useParams()
  const { tasks, completeTask, deleteTask, addProject, notifyEventListeners, generateMessage } = useContext(TaskContext)
  const { projects, removeTaskFromProject, deleteProject, changeNameProject, projectsPalette, changePaletteProject, changeProjectDescription, projectIcons, changeProjectIcon } = useContext(ProjectContext)

  const project = projects.find(project => project.id == projectId)
  const filteredTasks = tasks.filter(task => project.tasksId.includes(task.id)) || []
  const message = generateMessage(filteredTasks)

  const [editName, setEditName] = useState(false)
  const [editIcon, setEditIcon] = useState(false)
  const [editPalette, setEditPalette] = useState(false)
  const [projectName, setProjectName] = useState(project.name)
  const [editDescription, setEditDescription] = useState(false)
  const [projectDescription, setProjectDescription] = useState(project.description)

  useEffect(() => {
    setProjectName(project.name)
    setProjectDescription(project.description)
  }, [project.id])

  const handleDeleteATask = (taskId) => {
    deleteTask(taskId)
    removeTaskFromProject(taskId)
    notifyEventListeners()
  }

  const handleDeleteProject = () => {
    deleteProject(project.id)
    navigate('/')
  }

  const handleChangePalette = (newPaletteId) => {
    setEditPalette(false)
    changePaletteProject(project.id, newPaletteId)
  }

  const handleChangeProjectIcon = (iconId) => {
    setEditIcon(false)
    changeProjectIcon(project.id, iconId)
  }

  function goBackHome () {
    navigate('/')
  }

  return (
    <section className='w-full h-full overflow-y-auto flex flex-col items-center justify-center'>
      <div className={`${projectsPalette[project.paletteId].primaryColor} relative w-full h-24 md:h-[20vh]`}>
        <HiArrowCircleLeft className={`${projectsPalette[project.paletteId].primaryColor == 'bg-pgreen-600' ? 'text-white' : 'text-pgray-700'} text-4xl relative top-5 left-3 md:invisible`} onClick={goBackHome} />
        <button
          className={`p-2 rounded-md border ${projectsPalette[project.paletteId].primaryColor == 'bg-pgreen-600' ? 'border-white text-white' : 'border-pgray-700'} tracking-wider font-Quicksand font-bold text-xs absolute bottom-4 right-4 transition-colors duration-500 ease-in-out`}
          onClick={() => setEditPalette(!editPalette)}
        >Change color
        </button>
      </div>

      <section className='w-full pl-4 md:pl-6'>
        {editPalette &&
          <div className='w-40 origin-top absolute right-4 top-[7rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
            {projectsPalette.map(p =>
              <button
                className={`block px-4 py-2 text-sm text-gray-700 w-full text-start ${p.primaryColor} hover:${p.secondaryColor} hover:cursor-pointer`}
                key={p.id}
                value={p.id}
                onClick={() => { handleChangePalette(p.id) }}
              >{p.name}
              </button>)}
          </div>}
        <div className='px-2 md:px-4 max-w-7xl grid w-full items-start py-2'>
          <div className='flex items-center mt-6 gap-2 mb-2'>
            <i className='text-3xl text-zinc-400 cursor-pointer' onClick={() => setEditIcon(true)}>{project.icon ? projectIcons[project.icon].component : projectIcons[0].component}</i>
            {editIcon &&
              <div className='w-40 h-40 overflow-x-auto flex flex-wrap origin-top top-48 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                {projectIcons.map((icon) =>
                  <button
                    className='block px-4 py-2 text-base text-gray-700 hover:cursor-pointer'
                    key={icon.id}
                    value={icon.id}
                    onClick={() => { () => handleChangeProjectIcon(icon.id) }}
                  >{icon.component}
                  </button>)}
              </div>}
            {editName
              ? <Input text='big' item={project} value={projectName} onChange={setProjectName} setEdit={setEditName} mainFunction={changeNameProject} placeholder='Project name' />
              : <h1 className='font-bold inline tracking-wide font-Quicksand text-lg' onClick={() => setEditName(true)}>{projectName == '' ? 'Untitle project' : projectName}</h1>}
            {!editName && <SmallOptionsMenu onDelete={handleDeleteProject} />}
          </div>

          {!editDescription
            ? <p className='text-xs font-Quicksand text-gray-font' onClick={() => setEditDescription(true)}>{projectDescription == '' ? 'Add a description' : projectDescription}</p>
            : <Input placeholder='Description' item={project} value={projectDescription} onChange={setProjectDescription} setEdit={setEditDescription} mainFunction={changeProjectDescription} />}

          <h2 className='font-Quicksand text-lg font-semibold mt-4'>Tasks</h2>
          {filteredTasks.length == 0 ? <p className='font-Quicksand mt-2 text-sm'>Add your first task for this project!</p> : <p className='font-Quicksand mt-2 text-sm'>{message}</p>}
          <AddTask projectId={project.id} />

          {filteredTasks.length > 0 && <>
            <div className=' w-full py-2'>
              {filteredTasks.map(task => (
                <TodoItem
                  key={task.id}
                  task={task}
                  showProject={false}
                  onComplete={() => { completeTask(task.id) }}
                  onDelete={() => { handleDeleteATask(task.id) }}
                  onAddProject={addProject}
                />
              ))}
            </div>
          </>}
        </div>
      </section>
    </section>
  )
}
