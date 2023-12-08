import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const { item: projects, updateInfo: setProjects, loading, error } = useLocalStorage('PROJECTS_V1', []);

  const projectsPallete = [
    { pallete: 1, name:'Blue', bgColor: 'bg-light-blue', secondaryColor: 'bg-very-light-blue' },
    { pallete: 2, name:'Green', bgColor: 'bg-light-green', secondaryColor: 'bg-very-light-green' },
    { pallete: 3, name:'Pink', bgColor: 'bg-light-pink', secondaryColor: 'bg-very-light-pink' },
    { pallete: 4, name:'Yellow', bgColor: 'bg-light-yellow', secondaryColor: 'bg-very-light-yellow' },
    { pallete: 5, name:'Menta', bgColor: 'bg-menta', secondaryColor: 'bg-light-menta' },
    { pallete: 6, name:'Purple', bgColor: 'bg-light-purple', secondaryColor: 'bg-very-light-purple' },
  ];

  // Function to generate ids
  function generateUniqueId() {
    return Date.now(); // It uses the timestamp as id
  }

  // Add a project
  function createProject(name, palleteId) {
    const newProject = {
      id: generateUniqueId(),
      name: name,
      bgColor: projectsPallete[palleteId - 1].bgColor,
      secondaryColor: projectsPallete[palleteId - 1].secondaryColor,
    };

    setProjects([...projects, newProject]);
  }

  // Delete a project by id
  function deleteProject(idProject) {
    setProjects(projects.filter( p => p.id !== idProject ));
  }

  return (
    <ProjectContext.Provider value={{ projects, createProject, deleteProject, loading, error, projectsPallete }}>
      {children}
    </ProjectContext.Provider>
  )
}

export { ProjectContext, ProjectProvider }