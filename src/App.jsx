import "./index.css";
import { TodoItem } from "./components/TodoItem"
import { ItemProject } from "./components/ItemProject";
import { ButtonNewTask } from "./components/buttons/ButtonNewTask";
import { ButtonViewAllProjects } from "./components/buttons/ButtonViewAllProjects";

function App() {
  return (
    <section className="pt-4">
      <h1 className="font-Quicksand font-bold text-lg pl-4">Hello user.name</h1>
      <p className="text-xs pl-4 font-Quicksand text-gray-font">You have work today</p>
      <h3 className="pt-4 pl-4 font-Quicksand">Today&apos;s taks</h3>
      <div className="pl-4 w-full flex flex-col items-center">
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
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
