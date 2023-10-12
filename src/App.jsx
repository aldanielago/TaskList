import "./index.css";
import { useState } from 'react';
import { TodoItem } from "./components/TodoItem"
import { ItemProject } from "./components/ItemProject";
import { ButtonNewTask } from "./components/buttons/ButtonNewTask";
import { ButtonViewAllProjects } from "./components/buttons/ButtonViewAllProjects";

const tasks_array = [
  { text: 'Hacer el ensayo', tasks: 23, completed: true},
  { text: 'Estudiar biología', tasks: 3, completed: false},
  { text: 'Codificar la interfaz', tasks: 12, completed: true},
]

function App() {
  let [ tasks, setTaks ] = useState(tasks_array);
  const completedTasks = tasks.filter( task => !!task.completed).length;
  const totalTasks = tasks.length;

  return (
    <section className="pt-4">
      <h1 className="font-Quicksand font-bold text-lg pl-4">Hello user.name</h1>
      <p className="text-xs pl-4 font-Quicksand text-gray-font">You have finished {completedTasks} of {totalTasks} taks.</p>
      <h3 className="pt-4 pl-4 font-Quicksand">Today&apos;s taks</h3>
      <div className="pl-4 w-full flex flex-col items-center">
        { tasks.map((task) => (
          <TodoItem key={task.id} text={task.text} tasks={task.tasks} setTaks={setTaks}/>
        ))}
        <ButtonNewTask/>
      </div>
      <h3 className="pt-4 pl-4 font-Quicksand">Your projects</h3>
      <div className="pl-4 w-full flex flex-col items-center">
        <ItemProject/>
        <ItemProject/>
        <ItemProject/>
        <ButtonViewAllProjects/>
      </div>
    </section>
  )
}

export default App
