import { GoHome, GoFileDirectory } from "react-icons/go";
import { Link } from "react-router-dom";

export function SideBar() {
  return (
    <nav className="bg-[#ceddfd] w-1/6 h-screen relative border-r border-primary-blue border-opacity-5">
      <Link to={'/'} className="w-full py-2 mt-6 pl-8 block">
        <GoHome className="text-2xl inline-block text-primary-blue mr-2"/>
        <span className="font-Quicksand">Home</span>
      </Link>
      <Link to={'/add-project'} className="w-full py-2 mt-2 pl-8 block">
        <GoFileDirectory className="text-2xl inline-block text-primary-blue mr-2"/>
        <span className="font-Quicksand">Add project</span>
      </Link>
    </nav>
  )
}