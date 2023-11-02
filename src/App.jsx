import "./index.css";
import { TaskSection } from "./components/TaskSection";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <section className="pt-4">
      <h1 className="font-Quicksand font-bold text-lg pl-4">Hello user.name</h1>
      <TaskProvider>
        <TaskSection/>
      </TaskProvider>
    </section>
  )
}

export default App
