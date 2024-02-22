import "./index.css";
import { AddProjectPage } from "./components/pages/AddProjectPage";
import { Home } from "./components/pages/Home";
import { ProjectPage } from "./components/pages/ProjectPage";
import { Routes, Route } from "react-router-dom";
import { SideBar } from "./components/elements/SideBar";
import { ProjectProvider } from "./contexts/ProjectsContext";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <div className="flex">
      <TaskProvider><ProjectProvider>
      <SideBar />
      <div className="flex-grow md:w-2/3 md:pl-[20%]">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/add-project" element={<AddProjectPage />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
        </Routes>
      </div>
      </ProjectProvider></TaskProvider>
    </div>
  );
}

export default App;
