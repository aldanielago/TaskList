import { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import { TodoItem } from '../elements/TodoItem';
import { LoadingTasks } from '../states/LoadingItems';
import { ErrorLoading } from '../states/ErrorLoading';
import { InformativeBox } from '../elements/InformativeBox';

export function TasksPage() {
  const { tasks, loading, error, completeTask, deleteTask } = useContext(TaskContext);

  const todayTasks = tasks.filter(t => {
    const today = new Date().toISOString().slice(0, 10);
    return t.date === today;
  });

  const tomorrowTasks = tasks.filter(t => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().slice(0, 10);
    return t.date === tomorrowDate && !t.completed;
  });

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0-6
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // get the last day of the week

  const tasksThisWeek = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    return taskDate >= startOfWeek && taskDate <= endOfWeek;
  });

  const nextWeekStart = new Date();
  nextWeekStart.setDate(nextWeekStart.getDate() + 2); // We skip today and tomorrow
  const nextWeekEnd = new Date();
  nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);

  const nextWeekTasks = tasks.filter(t => {
    const taskDate = new Date(t.date);
    return taskDate >= nextWeekStart && taskDate <= nextWeekEnd && !t.completed;
  });

  const startOfMonth = new Date();
  startOfMonth.setDate(2); // Saltar hoy y mañana
  const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 1);

  const thisMonthTasks = tasks.filter(t => {
    const taskDate = new Date(t.date);
    return taskDate >= startOfMonth && taskDate < endOfMonth && !t.completed;
  });

  const startOfNextMonth = new Date();
  startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1, 2); // Primer día del próximo mes

  const endOfNextMonth = new Date(startOfNextMonth.getFullYear(), startOfNextMonth.getMonth() + 1, 1);
  endOfNextMonth.setMonth(endOfNextMonth.getMonth() + 1);

  const nextMonthTasks = tasks.filter(t => {
    const taskDate = new Date(t.date);
    return taskDate >= startOfNextMonth && taskDate < endOfNextMonth && !t.completed;
  });

  const futureTasks = tasks.filter(t => {
    const taskDate = new Date(t.date);
    return taskDate > endOfNextMonth && !t.completed;
  });

  const overdueTasks = tasks.filter(t => {
    const taskDate = new Date(t.date);
    const today = new Date();

    return taskDate < today && !t.completed;
  });

  return (
    <>
      <h1 className="font-Quicksand font-bold text-lg pl-4 pt-4">Tasks</h1>
      <p className="text-xs pl-4 font-Quicksand text-gray-font">You have the next schedule tasks...</p>
      <section className="pl-4 w-full flex">
        { loading && <LoadingTasks/>}
        { error && <ErrorLoading/>}
        <div className="pl-4 w-full flex flex-col items-center">
          { (tasks.length === 0 && tomorrowTasks.length == 0 && nextWeekTasks.length == 0) && <InformativeBox time=" for this week"/>}
          { todayTasks && todayTasks.map((task) => (
            <>
              <h3 className="pt-4 pl-4 font-Quicksand self-start">Today</h3>
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
              <h3 className="pt-4 pl-4 font-Quicksand self-start">Tomorrow</h3>
              <TodoItem
                key={task.id}
                task={task}
                onComplete={() => { completeTask(task.id) }}
                onDelete={() => { deleteTask(task.id) }}
                showDate={false}
              />
            </>
          ))}
          { tasksThisWeek && tasksThisWeek.map((task) => (
            <>
              <h3 className="pt-4 pl-4 font-Quicksand self-start">Rest of the week</h3>
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
        <div className='pl-4 w-full flex flex-col items-center'>
          { thisMonthTasks.length === 0 && <InformativeBox time="for next months"/>}
          { nextWeekTasks === 0 && <>
            <h3 className="pt-4 pl-4 font-Quicksand self-start">Next week</h3>
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
          { thisMonthTasks ==! 0 && <>
            <h3 className="pt-4 pl-4 font-Quicksand self-start">This month</h3>
            {thisMonthTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onComplete={() => { completeTask(task.id) }}
                onDelete={() => { deleteTask(task.id) }}
                showDate={false}
              />
            ))}
          </>}
          { nextMonthTasks === 0 && <>
            <h3 className="pt-4 pl-4 font-Quicksand self-start">Next month</h3>
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
          { futureTasks === 0 && <>
            <h3 className="pt-4 pl-4 font-Quicksand self-start">Future</h3>
            {futureTasks.map((task) => (
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
        <div className='pl-4 w-full flex flex-col items-center'>
          { overdueTasks.length === 0 && <InformativeBox time="overdue"/>}
          { overdueTasks === 0 && <>
            <h3 className="pt-4 pl-4 font-Quicksand self-start">Overdue tasks</h3>
            {overdueTasks.map((task) => (
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