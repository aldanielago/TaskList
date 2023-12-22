import { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import { TodoItem } from '../elements/TodoItem';
import { LoadingTasks } from '../states/LoadingItems';
import { ErrorLoading } from '../states/ErrorLoading';
import { InformativeBox } from '../elements/InformativeBox';

export function TasksPage() {
  const { tasks, loading, error, completeTask, deleteTask, filterTasksByDate } = useContext(TaskContext);
  const filteredArray = filterTasksByDate(tasks);

  const renderTasksSection = (title, filterFunction) => {
    const filteredTasks = filteredArray.filter(filterFunction);

    if (filteredTasks.length === 0) {
      return null;
    }

    return (
      <div className="mb-4 md:w-3/4">
        <h3 className="font-Quicksand text-base font-bold mb-2">{title}</h3>
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            showDate={false}
            onComplete={() => { completeTask(task.id) }}
            onDelete={() => { deleteTask(task.id) }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="font-Quicksand font-bold text-lg">Tasks</h1>
      <p className="text-xs font-Quicksand text-gray-font mb-4">You have the next schedule tasks...</p>
      <section className="flex flex-col">
        <div className='w-full pr-4'>
          {loading && <LoadingTasks />}
          {error && <ErrorLoading />}
          {filteredArray.length === 0 && <InformativeBox />}
        </div>

        <div className='w-full flex flex-col md:flex-row'>
          <div className='w-full'>
            {renderTasksSection('Today tasks', task => task.formattedDate === 'today')}
            {renderTasksSection('Tomorrow tasks', task => task.formattedDate === 'tomorrow')}
            {renderTasksSection('This week tasks', task => task.formattedDate.includes('in ') && task.formattedDate.includes(' days'))}
            {renderTasksSection('This month tasks', task => task.formattedDate.includes('in ') && task.formattedDate.includes(' weeks'))}
          </div>
          <div className='w-full'>
            {renderTasksSection('Next month tasks', task => task.formattedDate === 'next month')}
            {renderTasksSection('Overdue tasks', task => task.formattedDate.includes('days ago'))}
            {renderTasksSection('Other tasks', task => task.formattedDate.includes('weeks ago') || task.formattedDate.includes('last month'))}
          </div>
        </div>
      </section>
    </div>
  );
}
