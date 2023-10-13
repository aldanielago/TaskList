import "./index.css";
import { useState } from 'react';
import { TodoItem } from "./components/items/TodoItem"
import { ProjectItem } from "./components/items/ProjectItem";
import { ButtonNewTask } from "./components/buttons/ButtonNewTask";
import { ButtonViewAllProjects } from "./components/buttons/ButtonViewAllProjects";

const tasksDefault = [
  { text: 'Hacer el ensayo', nameProject:'Pensum', completed: true},
  { text: 'Estudiar biología', nameProject:'VacationalRental', completed: false},
  { text: 'Codificar la interfaz', nameProject:'MovieAPI', completed: true},
]

const projectsDefault = [
  { name: 'Pensum', tasks: 10, team: 'bg-light-blue', colorProgressBar: 'bg-very-light-blue'},
  { name: 'VacationRental', tasks: 3, team: 'bg-light-yellow', colorProgressBar: 'bg-very-light-yellow'},
  { name: 'MovieAPI', tasks: 9, team: 'bg-light-pink', colorProgressBar: 'bg-very-light-pink'}
]

function App() {
  let [ projects, setProjects ] = useState(projectsDefault);
  let [ tasks, setTaks ] = useState(tasksDefault);
  let completedTasks = tasks.filter( task => !!task.completed).length;
  let totalTasks = tasks.length;

  const completeTask = (text) => {
    const newTasks = [...tasks];
    const indexTask = newTasks.findIndex(
      (task) => task.text = text
    );
    newTasks[indexTask].completed = true;
    setTaks(newTasks);
  }

  return (
    <section className="pt-4">
      <h1 className="font-Quicksand font-bold text-lg pl-4">Hello user.name</h1>
      <p className="text-xs pl-4 font-Quicksand text-gray-font">You have finished {completedTasks} of {totalTasks} taks.</p>
      <h3 className="pt-4 pl-4 font-Quicksand">Today&apos;s taks</h3>
      <div className="pl-4 w-full flex flex-col items-center">
        { tasks.map((task) => (
          <TodoItem key={task.text} text={task.text} nameProject={task.nameProject}
            completed={task.completed} onComplete={() => {
            completeTask(task.text)
          }}/>
        ))}
        <ButtonNewTask/>
      </div>
      <h3 className="pt-4 pl-4 font-Quicksand">Your projects</h3>
      <div className="pl-4 w-full flex flex-col items-center">
        { projects.map((project) => (
          <ProjectItem key={project.id} name={project.name} tasks={project.tasks}
          team={project.team} colorProgressBar={project.colorProgressBar}
          setProjects={setProjects}/>
        ))}
        <ButtonViewAllProjects/>
      </div>
    </section>
  )
}

export default App
