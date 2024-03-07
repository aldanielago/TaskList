import { useContext, useState } from "react"
import { PrimaryButton } from "../elements/PrimaryButton";
import { ProjectContext } from "../../contexts/ProjectsContext";
import { Input } from "../elements/Input";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export function AddProjectPage() {
  const { projectsPalette, createProject, projectIcons } = useContext(ProjectContext);
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
    icon: '0',
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
      createProject(project.name, project.color, project.icon, project.description);
      setProject({
        name: '',
        color: '',
        icon: '',
        description: ''
      });
      navigate('/');
    }
  }

  return (
    <section className="h-screen overflow-auto pl-6">
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      <h1 className="font-Quicksand font-bold text-xl pl-4 pt-12">Add a project</h1>
      <form className="flex flex-col pl-4 pt-4">
        <label className="flex flex-col gap-3 mb-4">
          <span className="font-Quicksand">Type the project&apos;s name</span>
          <Input placeholder={"Project's name"} onChange={handleChange} name={"name"}/>
        </label>
        <label className="flex flex-col gap-3 pb-4">
          <span className="font-Quicksand">Add a description</span>
          <Input placeholder={"Project's description"} onChange={handleChange} name={"description"}/>
        </label>
        <label className="flex flex-col gap-3 pb-4 max-w-[90%]">
          <span className="font-Quicksand">Choose an icon: </span>
          <div className="flex overflow-x-auto gap-3">
            { projectIcons.map((icon, index) =>
              <label key={index}>
                <input type="radio" name="icon" value={index} className="hidden" onChange={(e) => handleChange(e)}/>
                <span className="font-Quicksand flex border hover:cursor-pointer hover:primary-blue w-12 h-12 rounded-full justify-center items-center">
                  <i className="text-2xl">{ icon.component }</i>
                </span>
              </label>
            )}
          </div>
        </label>
        <label className="flex flex-col gap-3 mb-4 max-w-[90%]">
          <span className="font-Quicksand">Choose a color</span>
          <div className="flex gap-3 overflow-x-auto pr-2">
            { projectsPalette.map((p, index) =>
                <label key={index}>
                  <input type="radio" name="color" value={p.id} className="hidden" onChange={(e) => handleChange(e)}/>
                  <span
                    className={`font-Quicksand block border ${p.primaryColor} hover:cursor-pointer hover:${p.secondaryColor} w-12 h-12 rounded-full`}>
                  </span>
                </label>
              )}
          </div>
        </label>
        <PrimaryButton text="Add project" onClick={handleAddProject}/>
      </form>
    </section>
  );
}
