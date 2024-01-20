import "./index.css";
import { Home } from "./components/pages/Home";
import { Routes, Route } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import { SideBar } from "./components/elements/SideBar"
import { ProjectPage } from "./components/pages/ProjectPage";
import { ProjectProvider } from "./contexts/ProjectsContext";
import { AddProjectPage } from "./components/pages/AddProjectPage";

function App() {
  return (
    <div className="flex">
      <ProjectProvider><SideBar /></ProjectProvider>
      <div className="flex-grow md:w-2/3 md:pl-[20%]">
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
