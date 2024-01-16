import "./index.css";
import { Routes, Route } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import { ProjectProvider } from "./contexts/ProjectsContext";
import { Home } from "./components/pages/Home";
import { ProjectPage } from "./components/pages/ProjectPage";
import { AddProjectPage } from "./components/pages/AddProjectPage";
import { SideBar } from "./components/elements/SideBar"

function App() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow w-3/4">
        <Routes>
          <Route path="/" exact element={<TaskProvider><ProjectProvider><Home /></ProjectProvider></TaskProvider>} />
          <Route path="/add-project" element={<ProjectProvider><TaskProvider><AddProjectPage /></TaskProvider></ProjectProvider>} />
          <Route path="/projects/:projectId" element={<TaskProvider><ProjectProvider><ProjectPage /></ProjectProvider></TaskProvider>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
