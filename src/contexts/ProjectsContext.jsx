import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ProjectContext = createContext()

function ProjectProvider({ children }) {
  const { item: projects, updateInfo: setProjects, loading, error } = useLocalStorage('TASKS_V1', []);

  // Function to generate ids
  function generateUniqueId() {
    return Date.now(); // It uses the timestamp as id
  }

  // Add a project
  function createProject(name, tasks, bgColor, secondaryColor) {
    const newProject = {
      id: generateUniqueId(),
      name: name,
      tasks: tasks,
      bgColor: bgColor,
      secondaryColor: secondaryColor
    };

    setProjects([...projects, newProject]);
  }

  return (
    <ProjectContext.Provider value={{ projects, createProject, loading, error }}>
      {children}
    </ProjectContext.Provider>
  )
}

export { ProjectContext, ProjectProvider }