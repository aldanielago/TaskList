import { GoHome } from 'react-icons/go'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ProjectContext } from '../../contexts/ProjectsContext'

export function SideBar ({ setDarkMode }) {
  const { projects, projectIcons } = useContext(ProjectContext)

  return (
    <nav className='bg-[#ceddfd] md:flex content-between justify-between flex-col w-[20%] h-screen fixed border-r border-inherit border-pblue-500 border-opacity-5 overflow-y-auto hidden'>
      <div>
        <Link to='/' className='w-full flex py-[10px] mt-6 pl-8 hover:bg-[#aac2f4] hover:border-[#aac2f4] transition-colors duration-300 active:border-l-4 border-l-4 focus:bg-[#aac2f4] focus:font-medium active:border-l-pblue-500 focus:border-l-pblue-500 focus:outline-none'>
          <GoHome className='text-2xl inline-block text-pblue-500 mr-2' />
          <span className='font-Quicksand'>Home</span>
        </Link>
        <Link to='/add-project' className='w-full flex py-[10px] mt-6 pl-8 hover:bg-[#aac2f4] hover:border-[#aac2f4] transition-colors duration-300 active:border-l-4 border-l-4 focus:bg-[#aac2f4] focus:font-medium active:border-l-pblue-500 focus:border-l-pblue-500 focus:outline-none'>
          <IoAddCircleOutline className='text-2xl inline-block text-pblue-500 mr-2' />
          <span className='font-Quicksand'>Add project</span>
        </Link>
        {projects.length > 0 && <h3 className='font-Quicksand pt-2 mt-6 pl-8 block font-semibold'>Projects</h3>}
        <div>
          {projects.map((project) =>
            <Link to={`/projects/${project.id}`} key={project.id} className='w-full flex py-[10px] pr-4 mt-6 pl-8 hover:bg-[#aac2f4] hover:border-[#aac2f4] transition-colors duration-300 active:border-l-4 border-l-4 focus:bg-[#aac2f4] focus:font-medium active:border-l-pblue-500 focus:border-l-pblue-500 focus:outline-none'>
              <i className='text-2xl inline-block text-pblue-500 mr-2'>{project.icon ? projectIcons[project.icon].component : projectIcons[0].component}</i>
              <span className='font-Quicksand line-clamp-1'>{project.name}</span>
            </Link>
          )}
        </div>
      </div>

      <div className='w-100 pl-6 pb-6'>
        <label className='switch'>
          <span className='sun'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='#ffd43b'><circle r='5' cy='12' cx='12' /><path d='m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z' /></g></svg></span>
          <span className='moon'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'><path d='m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z' /></svg></span>
          <input type='checkbox' className='input' onClick={setDarkMode} />
          <span className='slider' />
        </label>
      </div>
    </nav>
  )
}
