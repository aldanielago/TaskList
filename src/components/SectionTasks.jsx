import { useState } from 'react';
import { TodoItem } from "../components/items/TodoItem";
import { ButtonNewTask } from "../components/buttons/ButtonNewTask";

const tasksDefault = [
  { text: 'Hacer el ensayo', nameProject:'Pensum', completed: false},
  { text: 'Estudiar biología', nameProject:'VacationalRental', completed: false},
  { text: 'Codificar la interfaz', nameProject:'MovieAPI', completed: false},
];

function SectionTasks(){
  const [ tasks, setTasks ] = useState(tasksDefault);
  let completedTasks = tasks.filter( task => !!task.completed).length;
  let totalTasks = tasks.length;
  let message;

  const updateTasks = (text, action) => {
    const newTasks = [...tasks];
    const indexTask = newTasks.findIndex(
      (task) => task.text == text
    );

    action == 'complete'
      ? newTasks[indexTask].completed == true ? newTasks[indexTask].completed = false : newTasks[indexTask].completed = true
      : newTasks.splice(indexTask, 1);

    setTasks(newTasks);
  };

  if(completedTasks == totalTasks){
    message = (
      <p className="text-xs pl-4 font-Quicksand text-gray-font">
        You have done everything for today! Keep going 😉
      </p>
    )
  } else {
    message = (
      <p className="text-xs pl-4 font-Quicksand text-gray-font">You have finished
        <span className="font-bold ml-1">{completedTasks}</span> of
        <span className="font-bold ml-1">{totalTasks}</span> taks.
      </p>
    )
  }

  return (
    <section>
      { message }
      <h3 className="pt-4 pl-4 font-Quicksand">Today&apos;s taks</h3>
      <div className="pl-4 w-full flex flex-col items-center">
        { tasks.map((task) => (
          <TodoItem key={task.text} text={task.text} nameProject={task.nameProject} completed={task.completed}
            onComplete={() => { updateTasks(task.text, 'complete') }}
            onDelete={() => { updateTasks(task.text, 'delete') }}
          />
        ))}
        <ButtonNewTask/>
      </div>
    </section>
  )
}

export { SectionTasks }