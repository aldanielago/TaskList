import "./index.css";
import { ProjectItem } from "./components/items/ProjectItem";
import { ButtonViewAllProjects } from "./components/buttons/ButtonViewAllProjects";
import { SectionTasks } from "./components/sectionTasks";
import { useState } from "react";

const projectsDefault = [
  { name: 'Pensum', tasks: 10, team: 'bg-light-blue', colorProgressBar: 'bg-very-light-blue'},
  { name: 'VacationRental', tasks: 3, team: 'bg-light-yellow', colorProgressBar: 'bg-very-light-yellow'},
  { name: 'MovieAPI', tasks: 9, team: 'bg-light-pink', colorProgressBar: 'bg-very-light-pink'}
]

function App() {
  const [ projects, setProjects ] = useState(projectsDefault);

  return (
    <section className="pt-4">
      <h1 className="font-Quicksand font-bold text-lg pl-4">Hello user.name</h1>
      <SectionTasks/>
      <h3 className="pt-4 pl-4 font-Quicksand">Your projects</h3>
      <div className="pl-4 w-full flex flex-col items-center">
        { projects.map((project) => (
          <ProjectItem key={project.name} name={project.name} tasks={project.tasks}
          team={project.team} colorProgressBar={project.colorProgressBar}
          setProjects={setProjects}/>
        ))}
        <ButtonViewAllProjects/>
      </div>
    </section>
  )
}

export default App
