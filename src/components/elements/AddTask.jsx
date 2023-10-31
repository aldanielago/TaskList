import { CiCirclePlus } from "react-icons/ci";

function AddTask() {
  return (
    <div className="max-w-lg p-3 pl-5 mt-2 w-11/12 rounded-3xl flex justify-between items-center shadow-md border-slate-400 border border-opacity-5">
      <input id="nameTask" type="text" placeholder="Name task" className="pl-0 pb-1 font-Quicksand text-sm border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-primary-blue transition-colors ease-linear delay-200 duration-150 form-input w-1/2"/>
      <label htmlFor="nameProject" className="w-1/4">
        <select className="font-Quicksand text-sm w-full">
          <option value="">Project</option>
        </select>
      </label>
      <button title="Add new task" className="cursor-pointer outline-none hover:rotate-90 duration-300 p-0">
        <CiCirclePlus size={38} className="text-zinc-400 duration-300 font-bold hover:text-light-green transition-colors"/>
      </button>
    </div>
  )
}

export { AddTask }