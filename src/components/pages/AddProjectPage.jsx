import { useContext, useState } from "react"
import { PrimaryButton } from "../buttons/PrimaryButton"
import { ProjectContext } from "../../contexts/ProjectsContext"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export function AddProjectPage() {
  const { projectsPallete, createProject } = useContext(ProjectContext);
  const navigate = useNavigate();

  const notify = () => {
      toast('Please, fill all the information. ', {
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
    color: '0',
    description: '',
  });

  function handleChange(e) {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  }

  function handleAddProject() {
    if(project.name === '') {
      notify();
      return;
    } else {
      createProject(project.name, project.color, project.description);
      setProject({
        name: '',
        color: '',
        description: ''
      });
      navigate('/');
    }
  }

  return (
    <section className="">
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      <h1 className="font-Quicksand font-bold text-xl pl-4 pt-12">Add a project</h1>
      <form className="flex flex-col pl-4 pt-4">
        <label className="flex flex-col gap-3 mb-4">
          <span className="font-Quicksand">Type the project&apos;s name</span>
          <input className="font-Quicksand border border-light-blue rounded-md p-2" type="text" name="name" onChange={(e) => handleChange(e)}  placeholder="Project's name"/>
        </label>
        <label className="flex flex-col gap-3 mb-4">
          <span className="font-Quicksand">Choose one color</span>
          <div className="flex gap-3">
            { projectsPallete.map((p, index) => {
              return (
                <label key={index}>
                  <input type="radio" name="color" value={p.pallete} className="hidden" onChange={(e) => handleChange(e)}/>
                  <span
                    className={`font-Quicksand w-min block border ${p.primaryColor} hover:cursor-pointer p-2 rounded-xl`}>
                    {p.name}
                  </span>
                </label>
              )})}
          </div>
        </label>
        <label className="flex flex-col gap-3">
          <span className="font-Quicksand">Add a description</span>
          <textarea onChange={(e) => handleChange(e)} className="p-4 font-Quicksand border rounded-lg border-light-blue" name="description" id="" cols="30" rows="10"></textarea>
        </label>
        <PrimaryButton text="Add project" onClick={handleAddProject}/>
      </form>
    </section>
  )
}