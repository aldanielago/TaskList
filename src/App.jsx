import "./index.css";
import { Home } from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import { TasksPage } from "./components/pages/TasksPage";
import { ProjectProvider } from "./contexts/ProjectsContext";
import { ProjectPage } from "./components/pages/ProjectPage";
import { AddProjectPage } from "./components/pages/AddProjectPage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<TaskProvider><ProjectProvider><Home/></ProjectProvider></TaskProvider>} />
      <Route path="/tasks" element={<TaskProvider><ProjectProvider><TasksPage/></ProjectProvider></TaskProvider>} />
      <Route path="/add-project" element={<ProjectProvider><TaskProvider><AddProjectPage/></TaskProvider></ProjectProvider>} />
      <Route path="/projects/:projectId" element={<TaskProvider><ProjectProvider><ProjectPage/></ProjectProvider></TaskProvider>} />
    </Routes>
  )
}

export default App;