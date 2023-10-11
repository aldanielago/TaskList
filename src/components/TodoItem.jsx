function TodoItem() {
  return (
    <div className="bg-secondary-light max-w-lg p-3 mt-2 w-11/12 rounded-3xl flex gap-3 items-center shadow-md">
      <button className="bg-unset cursor-pointer">
        <img src="/circle.svg" alt="" srcSet="" />
      </button>
      <div className="flex flex-col">
        <p className="font-Quicksand text-sm">Nombre del proyecto</p>
        <p className="text-xs font-Quicksand">12 taks to do</p>
      </div>
    </div>
  );
}

export { TodoItem }