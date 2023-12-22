import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const { item: projects, updateInfo: setProjects, loading, error } = useLocalStorage('PROJECTS_V1', []);

  const projectsPallete = [
    { pallete: 0, name:'Blue', primaryColor: 'bg-light-blue', secondaryColor: 'bg-very-light-blue' },
    { pallete: 1, name:'Green', primaryColor: 'bg-light-green', secondaryColor: 'bg-very-light-green' },
    { pallete: 2, name:'Pink', primaryColor: 'bg-light-pink', secondaryColor: 'bg-very-light-pink' },
    { pallete: 3, name:'Yellow', primaryColor: 'bg-light-yellow', secondaryColor: 'bg-very-light-yellow' },
    { pallete: 4, name:'Menta', primaryColor: 'bg-menta', secondaryColor: 'bg-light-menta' },
    { pallete: 5, name:'Purple', primaryColor: 'bg-light-purple', secondaryColor: 'bg-very-light-purple' },
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
      primaryColor: projectsPallete[palleteId].primaryColor,
      secondaryColor: projectsPallete[palleteId].secondaryColor,
      tasks: []
    };

    setProjects([...projects, newProject]);
  }

  // Delete a project by id
  function deleteProject(idProject) {
    setProjects(projects.filter( p => p.id !== idProject ));
  }

  function removeTaskFromProject(taskId) {
    const newProjects = projects.map((p) => {
      if (p.tasks !== undefined) {
        const newTasks = p.tasks.filter((taskIdInProject) => taskIdInProject !== taskId);
        return {
          ...p,
          tasks: newTasks
        };
      } else {
        return p;
      }
    });
    setProjects(newProjects);
  }

  function addTaskToProject(idProject, task) {
    removeTaskFromProject(task);
    const newProjects = projects.map((p) => {
      if (p.id === idProject) {
        if (p.tasks === undefined) {
          return {
            ...p,
            tasks: [task]
          };
        } else {
          return {
            ...p,
            tasks: [...p.tasks, task]
          };
        }
      } else {
        return p;
      }
    });
    setProjects(newProjects);
  }

  return (
    <ProjectContext.Provider value={{
      error,
      loading,
      projects,
      projectsPallete,
      createProject,
      deleteProject,
      addTaskToProject,
      removeTaskFromProject,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export { ProjectContext, ProjectProvider }