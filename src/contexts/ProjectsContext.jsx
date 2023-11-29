import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ProjectContext = createContext();

const projectsPallete = [
  { pallete: 1, bgColor: 'light-blue', secondaryColor: 'very-light-blue' },
  { pallete: 2, bgColor: 'light-green', secondaryColor: 'very-light-green' },
  { pallete: 3, bgColor: 'light-pink', secondaryColor: 'very-light-pink' },
  { pallete: 4, bgColor: 'light-yellow', secondaryColor: 'very-light-yellow' },
  { pallete: 5, bgColor: 'menta', secondaryColor: 'light-menta' },
  { pallete: 6, bgColor: 'light-purple', secondaryColor: 'very-light-purple' },
];

function ProjectProvider({ children }) {
  const { item: projects, updateInfo: setProjects, loading, error } = useLocalStorage('TASKS_V1', []);

  // Function to generate ids
  function generateUniqueId() {
    return Date.now(); // It uses the timestamp as id
  }

  // Add a project
  function createProject(name, tasks, palleteId) {
    const newProject = {
      id: generateUniqueId(),
      name: name,
      tasks: tasks,
      palleteId: palleteId,
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