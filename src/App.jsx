import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { TaskProvider } from "./contexts/TaskContext";
import { TasksPage } from "./components/pages/TasksPage";
import { AddProjectPage } from "./components/pages/AddProjectPage";
import { ProjectProvider } from "./contexts/ProjectsContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskProvider><Home /></TaskProvider>} />
      <Route path="/tasks" element={<TaskProvider><TasksPage/></TaskProvider>} />
      <Route path="/add-project" element={<ProjectProvider><TaskProvider><AddProjectPage/></TaskProvider></ProjectProvider>} />
    </Routes>
  )
}

export default App;