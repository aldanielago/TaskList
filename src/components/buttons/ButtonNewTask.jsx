function ButtonNewTask() {
  return (
    <button onClick={(event) => {
      console.log(event);
    }} 
    className="bg-primary-blue rounded-2xl px-6 py-1 shadow-md text-white my-4 mx-auto hover:bg-blue-hover transition-colors duration-500 ease-in-out">Add new task</button>
  )
}

export { ButtonNewTask }