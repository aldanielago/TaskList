import { MdOutlineMoreHoriz } from "react-icons/md";
import { ProjectContext } from '../../contexts/ProjectsContext';
import { useState, useRef, useEffect, useContext } from 'react';

export function SmallOptionsMenu({ item, onDelete, onAddProject }) {
  const { projects, removeTaskFromProject } = useContext(ProjectContext);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ toAddProject, setToAddProject] = useState(false);
  const menuRef = useRef(null);

  let haveProject = false;
  if(onAddProject) {
    haveProject = projects.find( p => p.tasksId.includes(item.id)) ? true : false || false;
  }

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleAddToProjectClick = () => {
    setIsOpen(false);
    setToAddProject(true);
  };

  const handleDeleteClick = () => {
    onDelete();
    setIsOpen(false);
  };

  const handleAddProject = (p) => {
    onAddProject(item.id, p.id);
    setToAddProject(false);
  };

  const handleRemoveProject = () => {
    removeTaskFromProject(item.id);
    setIsOpen(false);
  }

  // This function close the menu when the user clicks outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setToAddProject(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <MdOutlineMoreHoriz size={35} className="text-zinc-400 hover:text-pblue-500 transition-colors ease-linear hover:cursor-pointer" onClick={handleMenuToggle}/>
      {isOpen && (
        <div ref={menuRef} className="origin-top absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            { (onAddProject && projects.length != 0 && !haveProject ) && <button onClick={handleAddToProjectClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-start" > Add to project </button>}
            { (onAddProject && haveProject) && <button onClick={handleRemoveProject} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-start" > Remove project </button>}
            { onDelete && <button onClick={handleDeleteClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-start" > Delete </button>}
          </div>
        </div>
      )}

      { toAddProject && <>
        <div className="origin-top absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-sm text-gray-700">
          {projects.map( p => <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-start"
            key={p.id}
            value={p.id}
            onClick={() => { handleAddProject(p) }}
          >{p.name}
          </button>)}
        </div>
      </>}
    </div>
  );
}
