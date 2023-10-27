import { createPortal } from "react-dom";

function AddTaskModal(){
  return createPortal(
    <div className="w-7/12 h-4/6 rounded-md border-1 bg-white border-x-light-blue absolute top-1">
      <p>Type the next information</p>
      <label htmlFor="nameTasks">
        <span>Name task</span>
        <input id="nameTask" type="text" placeholder="Write an article" className=""/>
      </label>
      <label htmlFor="nameProject">
        <span>Select the proyect of your taks</span>
        <select name="" id="">
          {/* <option value=""></option> por cada elemento del array se renderiza una de estas  */}
        </select>
      </label>
    </div>,
    document.getElementById('modal')
  )
}

export { AddTaskModal }