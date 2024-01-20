import { useContext } from "react";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { ProjectContext } from "../../contexts/ProjectsContext";

export function SideBar() {
  const { projects, projectIcons } = useContext(ProjectContext);

  return (
    <nav className="bg-[#ceddfd] w-[20%] h-screen fixed border-r border-inherit border-primary-blue border-opacity-5 overflow-y-auto hidden md:block">
      <Link to={'/'} className="w-full flex py-[10px] mt-6 pl-8 hover:bg-[#aac2f4] hover:border-[#aac2f4] transition-colors duration-300 active:border-l-4 border-l-4 focus:bg-[#aac2f4] focus:font-medium active:border-l-primary-blue focus:border-l-primary-blue focus:outline-none">
        <GoHome className="text-2xl inline-block text-primary-blue mr-2"/>
        <span className="font-Quicksand">Home</span>
      </Link>
      <Link to={'/add-project'} className="w-full flex py-[10px] mt-6 pl-8 hover:bg-[#aac2f4] hover:border-[#aac2f4] transition-colors duration-300 active:border-l-4 border-l-4 focus:bg-[#aac2f4] focus:font-medium active:border-l-primary-blue focus:border-l-primary-blue focus:outline-none">
        <IoAddCircleOutline className="text-2xl inline-block text-primary-blue mr-2"/>
        <span className="font-Quicksand">Add project</span>
      </Link>
      { projects.length > 0 && <h3 className="font-Quicksand pt-2 mt-6 pl-8 block font-semibold">Projects</h3>}
      <div>
        { projects.map((project) =>
          <Link to={`/projects/${project.id}`} key={project.id} className="w-full flex py-[10px] pr-4 mt-6 pl-8 hover:bg-[#aac2f4] hover:border-[#aac2f4] transition-colors duration-300 active:border-l-4 border-l-4 focus:bg-[#aac2f4] focus:font-medium active:border-l-primary-blue focus:border-l-primary-blue focus:outline-none">
            <i className="text-2xl inline-block text-primary-blue mr-2">{ project.icon ? projectIcons[project.icon].component : projectIcons[0].component }</i>
            <span className="font-Quicksand line-clamp-1">{project.name}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}