import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { TaskProvider } from "./contexts/TaskContext";
import { TasksPage } from "./components/pages/TasksPage";
import { AddProjectPage } from "./components/pages/AddProjectPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskProvider><Home /></TaskProvider>} />
      <Route path="/tasks" element={<TaskProvider><TasksPage/></TaskProvider>} />
      <Route path="/add-project" element={<TaskProvider><AddProjectPage/></TaskProvider>} />
    </Routes>
  )
}

export default App;