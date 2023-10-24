import { TodoItem } from "../components/items/TodoItem";
import { useLocalStorage } from "../hooks/useLocalStorage"
import { LoadingTasks } from "./states/LoadingItems";
import { ErrorLoading } from "./states/ErrorLoading";
import { PrimaryButton } from "./buttons/PrimaryButton";

function SectionTasks(){
  const {
    item: tasks,
    updateInfo: setTasks,
    loading,
    error
  } = useLocalStorage('TASKS_V1', []);
  let completedTasks = tasks.filter( task => !!task.completed).length;
  let totalTasks = tasks.length;
  let message;

  // This function complete and delete a task and update the state and localstorage at the end.
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

  // This part changes the firt phrase in case the user have done everything or not.
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
        { loading && (
          <>
            <LoadingTasks/>
            <LoadingTasks/>
            <LoadingTasks/>
          </>
        )}
        { error && <ErrorLoading/>}
        { tasks.map((task) => (
          <TodoItem key={task.text} text={task.text} nameProject={task.nameProject} completed={task.completed}
            onComplete={() => { updateTasks(task.text, 'complete') }}
            onDelete={() => { updateTasks(task.text, 'delete') }}
          />
        ))}
        <PrimaryButton text="Add new task"/>
      </div>
    </section>
  )
}

export { SectionTasks }

// const todos = [
//   { text: 'Lo que sea 1', completed: false},
//   { text: 'Lo que sea 2', completed: false},
//   { text: 'Lo que sea 3', completed: false},
//   { text: 'Lo que sea 4', completed: false},
//   { text: 'Lo que sea 5', completed: false},
//   { text: 'Lo que sea 6', completed: false},
//   { text: 'Lo que sea 7', completed: false},
//   { text: 'Lo que sea 8', completed: false},
// ]

// localStorage.setItem('TASKS_V1', JSON.stringify(todos));