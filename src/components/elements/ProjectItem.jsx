import { useContext, useEffect, useState } from "react";
import { TaskContext } from '../../contexts/TaskContext';

function ProjectItem({ project }) {
  const { tasks } = useContext(TaskContext);
  const [ percentage, setPercentage ] = useState(0);

  useEffect(() => {
    if (project.tasks.length !== 0) {
      const projectTasks = tasks.filter(task => project.tasks.includes(task.id)) || 0;
      const completedTasks = tasks.filter(task => project.tasks.includes(task.id) && task.completed === true) || 0;

      if (projectTasks.length > 0) {
        const newPercentage = (completedTasks.length / projectTasks.length) * 100;
        setPercentage(newPercentage);
      }
    }
  }, [project, tasks]);

  const progressBarWidth = `${percentage}%`;

  return (
    <div className={`${project.primaryColor} max-w-lg p-3 pl-5 mt-2 w-11/12 rounded-3xl flex justify-between items-center shadow-md`}>
      <div className="flex flex-col justify-between">
        <p className="font-Quicksand text-sm">{ project.name === '' ? 'Untitled' : project.name }</p>
        { project.tasks.length > 0
          ? <p className="text-xs font-Quicksand">{ project.tasks.length } tasks to do. </p>
          : <p className="text-xs font-Quicksand"> No tasks to do. </p>
        }
      </div>
      <div className="flex w-3/5 justify-end items-center gap-2">
        <span style={{ width: progressBarWidth }} className={`${project.secondaryColor} h-2 rounded-lg transition-all duration-150 ease-in-out`}></span>
        <span className="text-xs font-Quicksand">{ percentage.toFixed(0) }%</span>
      </div>
    </div>
  );
}

export { ProjectItem }
