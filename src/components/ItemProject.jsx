function ItemProject(){
  return (
    <div className="bg-light-blue max-w-lg p-3 pl-5 mt-2 w-11/12 rounded-3xl flex justify-between items-center shadow-md">
      <div className="flex flex-col justify-between">
        <p className="font-Quicksand text-sm">Nombre del proyecto</p>
        <p className="text-xs font-Quicksand">12 taks to do</p>
      </div>
      <div className="bg-very-light-blue w-1/2 h-2 rounded-sm"></div>
    </div>
  );
}

export { ItemProject }