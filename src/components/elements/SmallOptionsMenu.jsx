import { MdOutlineMoreHoriz } from "react-icons/md";
import { ProjectContext } from '../../contexts/ProjectsContext';
import { useState, useRef, useEffect, useContext } from 'react';

export function SmallOptionsMenu({ item, onDelete, onAddProject }) {
  const { projects, removeTaskFromProject } = useContext(ProjectContext);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ toAddProject, setToAddProject] = useState(false);
  const menuRef = useRef(null);

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

  const addProject = (p) => {
    removeTaskFromProject(item.id);
    onAddProject(item.id, p.id);
    setToAddProject(false);
  };

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
    <MdOutlineMoreHoriz size={35} className="text-zinc-400 hover:text-primary-blue transition-colors ease-linear hover:cursor-pointer" onClick={handleMenuToggle}/>
      {isOpen && (
        <div ref={menuRef} className="origin-top absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            { onAddProject && <button
              onClick={handleAddToProjectClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-start"
            >
              Add to project
            </button>}
            { onDelete && <button
              onClick={handleDeleteClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-start"
            >
              Delete
            </button>}
          </div>
        </div>
      )}
      { toAddProject && <>
        <div className="origin-top absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-sm text-gray-700">
          {projects.map( p => <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-start"
            key={p.id}
            value={p.id}
            onClick={() => { addProject(p) }}
        >{p.name}</button>)}
        </div>
      </>}
    </div>
  );
}
