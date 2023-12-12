function ProjectItem({ project }){
  return (
    <div className={`${project.bgColor} max-w-lg p-3 pl-5 mt-2 w-11/12 rounded-3xl flex justify-between items-center shadow-md`}>
      <div className="flex flex-col justify-between">
        <p className="font-Quicksand text-sm">{ project.name }</p>
        { project.tasks.length > 0
          ? <p className="text-xs font-Quicksand">{ project.tasks.length } taks to do</p>
          : <p className="text-xs font-Quicksand">No tasks to do</p>
        }
      </div>
      <div className={`${project.secondaryColor} w-1/2 h-2 rounded-lg`}></div>
    </div>
  );
}

export { ProjectItem }