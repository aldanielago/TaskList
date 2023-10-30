function AddTask() {
  return (
    <div className="max-w-lg p-3 pl-5 mt-2 w-11/12 rounded-3xl flex justify-between items-center shadow-md border-slate-400 border border-opacity-5">
      <input id="nameTask" type="text" placeholder="Name task" className="pl-0 pb-1 font-Quicksand text-sm border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-primary-blue transition-colors ease-linear delay-200 duration-150 form-input w-1/2"/>
      <label htmlFor="nameProject" className="w-1/4">
        <select className="font-Quicksand text-sm w-full">
          <option value="">Project</option>
        </select>
      </label>
      <button title="Add new task" className="group cursor-pointer outline-none hover:rotate-90 duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="stroke-zinc-400 fill-none group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300 group-hover:stroke-light-green transition-colors w-8">
          <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5"></path>
          <path d="M8 12H16" strokeWidth="1.5"></path>
          <path d="M12 16V8" strokeWidth="1.5"></path>
        </svg>
      </button>
    </div>
  )
}

export { AddTask }