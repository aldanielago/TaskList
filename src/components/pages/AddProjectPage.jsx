import { useContext, useState } from "react"
import { PrimaryButton } from "../buttons/PrimaryButton"
import { ProjectContext } from "../../contexts/ProjectsContext"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export function AddProjectPage() {
  const { projectsPallete, createProject } = useContext(ProjectContext);

  const notify = () => {
      toast('Remember fill all the information', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      progressClassName: "primary-blue"
    });
  }

  const [ project, setProject ] = useState({
    name: '',
    color: '',
  });

  function handleChange(e) {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  }

  function handleAddProject() {
    if(project.name === '' || project.color === '') {
      notify();
      return;
    } else {
      createProject(project.name, project.color);
      setProject({
        name: '',
        color: '',
      });
    }
  }

  return (
    <section className="">
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      <h1 className="font-Quicksand font-bold text-xl pl-4 pt-12">Add a project</h1>
      <form className="flex flex-col pl-4 pt-4">
        <label className="flex flex-col gap-3">
          <span className="font-Quicksand">Escribe el nombre del proyecto: </span>
          <input className="font-Quicksand border border-light-blue rounded-md p-2" type="text" name="name" onChange={(e) => handleChange(e)}  placeholder="Project's name"/>
        </label>
        <label className="flex flex-col">
          <span className="font-Quicksand">Selecciona un color: </span>
          <div className="flex gap-3">
            { projectsPallete.map((p, index) => {
              return (
                <label key={index}>
                  <input type="radio" name="color" value={p.pallete} className="hidden" onChange={(e) => handleChange(e)}/>
                  <span
                    className={`font-Quicksand w-min block border ${p.bgColor} hover:${p.secondaryColor} active:${p.secondaryColor} hover:cursor-pointer p-2 rounded-xl`}>
                    {p.name}
                  </span>
                </label>
              )})}
          </div>
        </label>
        <Link to={project.name && project.color ? '/' : ''} className="self-center">
          <PrimaryButton text="Add project" onClick={handleAddProject}/>
        </Link>
      </form>
    </section>
  )
}