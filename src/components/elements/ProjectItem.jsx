
function ProjectItem({ name, tasks, team, colorProgressBar}){

  return (
    <div className={`${team} max-w-lg p-3 pl-5 mt-2 w-11/12 rounded-3xl flex justify-between items-center shadow-md`}>
      <div className="flex flex-col justify-between">
        <p className="font-Quicksand text-sm">{name}</p>
        { tasks
          ? <p className="text-xs font-Quicksand">{tasks} taks to do</p>
          : <p className="text-xs font-Quicksand">No tasks to do</p>
        }
      </div>
      <div className={`${colorProgressBar} w-1/2 h-2 rounded-lg`}></div>
    </div>
  );
}

export { ProjectItem }