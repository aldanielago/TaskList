import { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import { TodoItem } from '../elements/TodoItem';
import { LoadingTasks } from '../states/LoadingItems';
import { ErrorLoading } from '../states/ErrorLoading';

export function TasksPage() {
  const { tasks, loading, error, completeTask, deleteTask } = useContext(TaskContext);

  const todayTasks = tasks.filter( t => t.date === new Date().toISOString().slice(0, 10));
  const tomorrowTasks = tasks.filter( t => t.date === new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const nextWeekTasks = tasks.filter( t => t.date === new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const nextMonthTasks = tasks.filter( t => t.date === new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const pastTasks = tasks.filter( t => t.date < new Date().toISOString().slice(0, 10));

  return (
    <>
      <h1 className="font-Quicksand font-bold text-lg pl-4 pt-4">Tasks</h1>
      <p className="text-xs pl-4 font-Quicksand text-gray-font">You have the next schedule tasks...</p>
      <section className="pl-4 w-full flex">
        { loading && <LoadingTasks/>}
        { error && <ErrorLoading/>}
        <div className="flex flex-col">
          { todayTasks && todayTasks.map((task) => (
            <>
              <h3 className="pt-4 pl-4 font-Quicksand">Today</h3>
              <TodoItem
                key={task.id}
                task={task}
                onComplete={() => { completeTask(task.id) }}
                onDelete={() => { deleteTask(task.id) }}
                showDate={false}
              />
            </>
          ))}
          { tomorrowTasks && tomorrowTasks.map((task) => (
            <>
              <h3 className="pt-4 pl-4 font-Quicksand">Tomorrow</h3>
              <TodoItem
                key={task.id}
                task={task}
                onComplete={() => { completeTask(task.id) }}
                onDelete={() => { deleteTask(task.id) }}
                showDate={false}
              />
            </>
          ))}
        </div>
        <div>
          { nextWeekTasks && <>
            <h3 className="pt-4 pl-4 font-Quicksand">Next week</h3>
            {nextWeekTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onComplete={() => { completeTask(task.id) }}
                onDelete={() => { deleteTask(task.id) }}
                showDate={false}
              />
            ))}
          </>}
          { nextMonthTasks && <>
            <h3 className="pt-4 pl-4 font-Quicksand">Next month</h3>
            {nextMonthTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onComplete={() => { completeTask(task.id) }}
                onDelete={() => { deleteTask(task.id) }}
                showDate={false}
              />
            ))}
          </>}
        </div>
        <div>
          { pastTasks && <>
            <h3>Past tasks</h3>
            { pastTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onComplete={() => { completeTask(task.id) }}
                onDelete={() => { deleteTask(task.id) }}
                showDate={false}
              />
            ))}
          </>}
        </div>
      </section>
    </>
  )
}